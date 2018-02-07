// import * as cookieParser from 'cookie-parser';
import * as express from 'express';
import * as https from 'https';
import * as fs from 'fs';
// import * as rp from 'request-promise';
// import { IncomingMessage } from 'http';
// import { Cookie } from 'tough-cookie';

import * as mysql from 'mysql';

const options = {
  key: fs.readFileSync(process.env.SSL_PRIVATE_KEY || ''),
  cert: fs.readFileSync(process.env.SSL_CERT || ''),
  requestCert: false,
  rejectUnauthorized: false,
};

const app = express();
// const domain = `https://kbox.johnstoncc.edu`;
// const loginUrl = `${domain}/ams/shared/api/security/login`;
// const fetchMachinesUrl = `${domain}/api/inventory/machines`;

// Given the user name and password from the client (base64 encoded),
// return the 'set-cookie' header from the response and coerce it to []
// invalid credentials ought to be caught in the calling statement
// Note that after setting the cookies, subsequent requests won't need to hit this.
// async function getLoginCookies(userName: string, password: string): Promise<string[]> {
//   const loginOptions = {
//     url: loginUrl,
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: {
//       userName: userName,
//       password: password,
//     },
//     json: true,
//     resolveWithFullResponse: true,
//   };

//   const loginMessage: IncomingMessage = await rp(loginOptions);
//   // tslint:disable-next-line:no-console
//   console.log('just logged in, and about to return it...');
//   return loginMessage.headers['set-cookie'] as string[] || [];
// }

// Given the proper login cookies (which contain credentials),
// attempt to fetch machine information from Kace and return it
// async function getMachinesMessage(loginCookies: string[]): Promise<IncomingMessage> {
//   const cookieJar = rp.jar();
//   const cookies = loginCookies.map((cookieStr: string) => rp.cookie(cookieStr) as Cookie);
//   cookies.forEach((cookie: Cookie) => cookieJar.setCookie(cookie, fetchMachinesUrl));

//   const tokenString =
//     cookieJar.getCookieString(fetchMachinesUrl).split('; ')
//       .find(cookieString => cookieString.startsWith('KACE_CSRF_TOKEN'));
//   const token = tokenString ? tokenString.split('=')[1] : '';

//   const getMachinesOptions = {
//     url: fetchMachinesUrl,
//     method: 'GET',
//     headers: {
//       'x-dell-csrf-token': token,
//       'x-dell-api-version': 5,
//     },
//     jar: cookieJar,
//   };
//   // tslint:disable-next-line:no-console
//   console.log('now getting the machines...');
//   return await rp(getMachinesOptions) as IncomingMessage;
// }

// helper method that formats the appropriate machine response to send to the client,
// then sends it.
// const sendMachinesMessage = (machinesMessage: IncomingMessage, loginCookies: string[], res: express.Response) => {
//   res.setHeader('Set-Cookie', [ ...loginCookies ]);
//   // tslint:disable-next-line:no-console
//   console.log('now sending the machines message');
//   res.send(machinesMessage);
// };

// helper method that just does the whole login -> get machines thing
// function loginThenGetMachines(userName: string, password: string, res: express.Response): void {
//   getLoginCookies(userName, password)
//     .then((loginCookies: any) =>
//       getMachinesMessage(loginCookies)
//         // tslint:disable-next-line:no-console
//         .then((machinesMessage) => sendMachinesMessage(machinesMessage, loginCookies, res))
//         .catch(err => res.send(err.response)))
//     .catch(err => res.send(err.error));
// }

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
// app.use(cookieParser());

app.get('/tickets', (_, res) => {

  const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_CATALOG,
  });

  connection.connect();

  const getTicketStatusQuery = `
  	SELECT
  	  HD_TICKET.ID AS "Id",
  		HD_TICKET.TITLE AS "Title",
  		HD_STATUS.NAME AS "Status",
    		CONCAT(
      		IF(
        		TIME_TO_SEC(NOW()) >= TIME_TO_SEC(HD_TICKET.TIME_OPENED),
          	TO_DAYS(NOW()) - TO_DAYS(HD_TICKET.TIME_OPENED),
          	TO_DAYS(NOW()) - TO_DAYS(HD_TICKET.TIME_OPENED) - 1), 'd ',
          	DATE_FORMAT(ADDTIME('2000-01-01 00:00:00',
          	SEC_TO_TIME(TIME_TO_SEC(NOW()) - TIME_TO_SEC(HD_TICKET.TIME_OPENED))),
              '%kh %im')) AS "Time_Open",
      HD_CATEGORY.NAME AS "Category",
      IFNULL(USER.FULL_NAME,' Unassigned') AS "Assigned_To",
      USER.EMAIL AS "Submitter",
      HD_TICKET.CC_LIST AS "CC_List"
    FROM HD_TICKET
    LEFT JOIN HD_CATEGORY ON HD_CATEGORY_ID = HD_CATEGORY.ID
    LEFT JOIN HD_STATUS ON HD_STATUS_ID = HD_STATUS.ID
    INNER JOIN USER ON HD_TICKET.SUBMITTER_ID = USER.ID
    ORDER BY HD_TICKET.TIME_OPENED DESC
    LIMIT 20
  `;

  connection.query(getTicketStatusQuery, (err, rows) => {
    if (err) res.send(err);
    res.send({ Tickets: rows });
  });

  connection.end();
});

app.get('/machines', (_, __) => {
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

  // const userName = process.env.API_USER || '';
  // const password = process.env.API_PASS || '';

  // // we want array form because the request-promise library cookieparser expects that form
  // // also, array -> object would require knowing the shape of the cookies. This solution is agnostic
  // const kaceLoginCookies = Object.keys(req.cookies).map(key => `${key}=${req.cookies[key]}`);

  // // tslint:disable-next-line:no-console
  // console.log('kace login cookies: ' + kaceLoginCookies);

  // // we want to store cookies on client side (for subsequent requests, other than machines)
  // // passing cookies back and forth between server and client requires some balancing
  // kaceLoginCookies.length !== 0
  //   ? getMachinesMessage(kaceLoginCookies)
  //       .catch(err => {
  //         // tslint:disable-next-line:no-console
  //         // console.log(err.response);
  //         // tslint:disable-next-line:no-console
  //         // console.log(JSON.parse(err.response.body)['errorDescription']);
  //         // tslint:disable-next-line:no-console
  //         // console.log(err.response && JSON.parse(err.response.body)['errorDescription'] !== 'Expired token');
  //         err.response && JSON.parse(err.response.body)['errorDescription'] !== 'Expired token'
  //           // tslint:disable-next-line:no-console
  //           ? console.log('some other error, we should see the response getting sent')
  //           // tslint:disable-next-line:no-console
  //           : console.log('expired token, we\'re about to login and get machines again');
  //         return err.response && JSON.parse(err.response.body)['errorDescription'] !== 'Expired token'
  //           ? res.send(err.response)
  //           : loginThenGetMachines(userName, password, res); })
  //       .then((machinesResponse) =>
  //         sendMachinesMessage(machinesResponse as IncomingMessage, kaceLoginCookies, res))
  //   : loginThenGetMachines(userName, password, res);
});

// tslint:disable-next-line:no-console
// app.listen(3003, () => console.log('listening on port 3003!'));
// tslint:disable-next-line:no-console
https.createServer(options, app).listen(3003, () => console.log('listening on port 3003!'));
