import * as cookieParser from 'cookie-parser';
import * as express from 'express';
import * as rp from 'request-promise';
import { IncomingMessage } from 'http';
import { Cookie } from 'tough-cookie';

const app = express();
const domain = `https://${process.env.DOMAIN_ROOT}.johnstoncc.edu`;
const loginUrl = `${domain}/ams/shared/api/security/login`;
const fetchMachinesUrl = `${domain}/api/inventory/machines`;

// Given the user name and password from the client (base64 encoded),
// return the 'set-cookie' header from the response and coerce it to []
// invalid credentials ought to be caught in the calling statement
// Note that after setting the cookies, subsequent requests won't need to hit this.
async function getLoginCookies(userName: string, password: string): Promise<string[]> {
  const loginOptions = {
    url: loginUrl,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: {
      userName: userName,
      password: password,
    },
    json: true,
    resolveWithFullResponse: true,
  };

  const loginMessage: IncomingMessage = await rp(loginOptions);
  return loginMessage.headers['set-cookie'] as string[] || [];
}

// Given the proper login cookies (which contain credentials),
// attempt to fetch machine information from Kace and return it
async function getMachinesMessage(loginCookies: string[]): Promise<IncomingMessage> {
  const cookieJar = rp.jar();
  const cookies = loginCookies.map((cookieStr: string) => rp.cookie(cookieStr) as Cookie);
  cookies.forEach((cookie: Cookie) => cookieJar.setCookie(cookie, fetchMachinesUrl));

  const tokenString =
    cookieJar.getCookieString(fetchMachinesUrl).split('; ')
      .find(cookieString => cookieString.startsWith('KACE_CSRF_TOKEN'));
  const token = tokenString ? tokenString.split('=')[1] : '';

  const getMachinesOptions = {
    url: fetchMachinesUrl,
    method: 'GET',
    headers: {
      'x-dell-csrf-token': token,
      'x-dell-api-version': 5,
    },
    jar: cookieJar,
  };

  return await rp(getMachinesOptions) as IncomingMessage;
}

// helper method that formats the appropriate machine response to send to the client,
// then sends it.
const sendMachinesMessage = (machinesMessage: IncomingMessage, loginCookies: string[], res: express.Response) => {
  res.setHeader('Set-Cookie', [ ...loginCookies ]);
  res.send(machinesMessage);
};

// helper method that just does the whole login -> get machines thing
function loginThenGetMachines(userName: string, password: string, res: express.Response): void {
  getLoginCookies(userName, password)
    .then((loginCookies: any) =>
      getMachinesMessage(loginCookies)
        .then((machinesMessage) => sendMachinesMessage(machinesMessage, loginCookies, res))
        .catch(err => res.send(err.response)))
    .catch(err => res.send(err.error));
}

// so our server trusts our app
app.use((_, res: express.Response, next) => {
  res.setHeader('Access-Control-Allow-Origin', [
    'https://localhost:4321',
  ]);
  res.setHeader('Access-Control-Allow-Headers', [
    'Authorization',
    'X-Requested-With',
  ]);
  next();
});

// so we can get cookies from requests
app.use(cookieParser());

app.get('/machines', (req, res) => {

  // assuming basic auth
  // also assuming 'username:password'
  // TODO: maybe not assume?
  // const authorizationHeader =
  //   typeof req.headers['authorization'] === 'string'
  //     ? req.headers['authorization'] as string
  //     : '';
  // const beginPasswordIndexPosition = authorizationHeader.indexOf(' ') + 1;
  // const encodedAuth = authorizationHeader.substring(beginPasswordIndexPosition);

  // const decodedAuth = Buffer.from(encodedAuth, 'base64');
  // const [userName, password] = decodedAuth.toString().split(':');

  const userName = process.env.API_USER || '';
  const password = process.env.API_PASS || '';

  // we want array form because the request-promise library cookieparser expects that form
  // also, array -> object would require knowing the shape of the cookies. This solution is agnostic
  const kaceLoginCookies = Object.keys(req.cookies).map(key => `${key}=${req.cookies[key]}`);

  // we want to store cookies on client side (for subsequent requests, other than machines)
  // passing cookies back and forth between server and client requires some balancing
  kaceLoginCookies.length !== 0
    ? getMachinesMessage(kaceLoginCookies)
        .catch(err => {
          return err.response && JSON.parse(err.response.body)['errorDescription'] !== 'Expired token'
            ? res.send(err.response)
            : loginThenGetMachines(userName, password, res); })
        .then((machinesResponse) =>
          sendMachinesMessage(machinesResponse as IncomingMessage, kaceLoginCookies, res))
    : loginThenGetMachines(userName, password, res);
});

// tslint:disable-next-line:no-console
app.listen(3003, () => console.log('listening on port 3003!'));
