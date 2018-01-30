// const express = require('express');
// const rp = require('request-promise');
// const app = express();

import * as cookieParser from 'cookie-parser';
import * as express from 'express';
import * as rp from 'request-promise';
import * as cookie from 'cookie';
// import { Cookie } from 'tough-cookie';
import { IncomingMessage } from 'http';
import { Cookie } from 'tough-cookie';
// import { deepEqual } from 'assert';
// import { Cookie } from 'tough-cookie';
// import { CookieJar } from 'request';
const app = express();

const domain = `https://${process.env.DOMAIN_ROOT}.johnstoncc.edu`;
const loginUrl = `${domain}/ams/shared/api/security/login`;
const fetchMachinesUrl = `${domain}/api/inventory/machines`;

// let cookieJar: CookieJar = rp.jar();
// let token: string = '';




// for request body parsing
// app.use(express.json());

// const loginToken = null;
// const loginCookies = null;

// function kaceCookieArrayToObject(cookieArray: string[]): KaceLoginCookies {
//   const cookie =
//     cookieArray
//       .map(cookieString => cookie.parse(cookieString))

//   return kaceLoginCookies;
// }

async function login(userName: string, password: string) {
  console.log('login start');
  const login = {
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
  }

  // try {
    // console.log('before login');
    const loginMessage: IncomingMessage = await rp(login);
    console.log(`login: ${loginMessage.headers['set-cookie']}`);
    // return loginMessage.headers['set-cookie'] as
    // const reqCookies = loginMessage.headers['set-cookie'] as string[] || [];
    // reqCookies.push(loginMessage.headers['x-dell-csrf-token'] as string || '');
    // console.log(`login: ${cookie.parse(loginMessage.headers['set-cookie'])}`)
    // const KaceLoginCookies: any =
    //   loginMessage.headers['set-cookie'] as string[] || []
    //     .map(cookieString => cookie.parse(cookieString))

    // console.log(`kace login cookies: ${KaceLoginCookies}`);
    // const cookieArray = loginMessage.headers['set-cookie'] as string[] || []
    // const cookieObjectArray =
    //   cookieArray
    //     .map(cookieString => {
    //       const cookieStringKeyValueArray = cookieString.split('=')
    //       return ({
    //         [cookieString.split('=')[0]]: cookieString.sli
    //       });
    //     });
    // console.log(loginMessage.headers['set-cookie'] as string[] || []);


    return loginMessage.headers['set-cookie'] as string[] || {};
    // return ({
    //   token: loginMessage.headers['x-dell-csrf-token'] as string || '',
    //   cookies: loginMessage.headers['set-cookie'] as string[] || [],
    // });
  // } catch (error) {
  //   // console.log(message);
  //   // throw message;
  //   // return new Error(message);
  //   // console.log(error.error);
  //   return Promise.reject(new Error(error));
  // }
}

// interface KaceLoginCookies {
//   kboxid: string;
//   'x-dell-auth-jwt': string;
//   KACE_CSRF_TOKEN: string;
//   KACE_LAST_USER_SECURE: string;
//   KACE_LAST_ORG_SECURE: string;
// }

async function getMachines(loginCookies: string[]) {
  // console.log('get machines begin');
  // console.log(loginCookies)
  const cookieJar = rp.jar();
  const cookies = loginCookies.map((cookieStr: string) => rp.cookie(cookieStr) as Cookie);
  cookies.forEach((cookie: Cookie) => cookieJar.setCookie(cookie, fetchMachinesUrl));
  // cookieJar.setCookie(`kboxid=${loginCookies.kboxid}`, fetchMachinesUrl);
  // cookieJar.setCookie(`x-dell-auth-jwt=${loginCookies['x-dell-auth-jwt']}`, fetchMachinesUrl);
  // cookieJar.setCookie(`KACE_CSRF_TOKEN=${loginCookies.KACE_CSRF_TOKEN}`, fetchMachinesUrl);
  // cookieJar.setCookie(`KACE_LAST_USER_SECURE=${loginCookies.KACE_LAST_USER_SECURE}`, fetchMachinesUrl);
  // cookieJar.setCookie(`KACE_LAST_ORG_SECURE=${loginCookies.KACE_LAST_ORG_SECURE}`, fetchMachinesUrl);
  // console.log(JSON.stringify(cookieJar));
  // rp.cookie(loginCookies.)
  // const cookies = loginCookies.map((cookieStr: string) => rp.cookie(cookieStr) as Cookie);

  // for (let [key, value] of entries)

  // const cookies = Object.keys(loginCookies).map((cookieKey) => rp.cookie(loginCookies.) as Cookie);
  // cookies.forEach((cookie: Cookie) => cookieJar.setCookie(cookie, fetchMachinesUrl));
  // console.log(`cookie domain: ${cookies.map(cookie => `${cookie.domain}`)}`);
  // console.log(`cookie value: ${cookies.map(cookie => `${cookie.value}`)}`);
  // console.log(`cookie key: ${cookies.map(cookie => `${cookie.key}`)}`);


  // console.log(`cookie jar: ${JSON.stringify(cookieJar)}`);
  // console.log(`cookies: ${cookies}`);
  // console.log(`cookie jar: ${JSON.stringify(cookieJar)}`);
  // console.log(cookieJar.getCookieString('x-dell-csrf-token'))

  // if (!cookies.find(cookie => cookie.key === 'KACE_CSRF_TOKEN')) {
  //   return Promise.reject(new Error('csrf token was not found in cookie payload'));
  // }

  // const token = cookies.filter(cookie => cookie.key === 'KACE_CSRF_TOKEN')[0].value;
  // console.log(cookies.filter(cookie => cookie.key === 'KACE_CSRF_TOKEN')[0].value);

  // const token = cookieJar.getCookieString('KACE_CSRF_TOKEN');
  // const token = cookieJar.getCookies(fetchMachinesUrl)
  const tokenString =
    cookieJar.getCookieString(fetchMachinesUrl).split('; ')
      .find(cookieString => cookieString.startsWith('KACE_CSRF_TOKEN'))
  const token = tokenString ? tokenString.split('=')[1] : '';
  console.log(token);

  const fetchMachines = {
    url: fetchMachinesUrl,
    method: 'GET',
    headers: {
      'x-dell-csrf-token': token,
      'x-dell-api-version': 5,
    },
    jar: cookieJar,
  };

  // let machinesResponse;

  // try {
  return await rp(fetchMachines) as IncomingMessage;
  // } catch ({ message }) {
  //   // res.send(message);
  //   throw message;
  // }

  // res.send(machinesResponse);
  // return machinesResponse;
}

// app.post('/login', (req, res: express.Response) => {
//   const loginUrl = `${domain}/ams/shared/api/security/login`;

//   async function loginToKace() {
//     const login = {
//       url: loginUrl,
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json'
//       },
//       body: {
//         userName: req.body.userName,
//         password: req.body.password,
//       },
//       json: true,
//       resolveWithFullResponse: true
//     }

//     let loginResponse;

//     try {
//       loginResponse = await rp(login);
//     } catch ({ message }) {
//       res.send(message);
//     }

//     res.send(loginResponse);
//   }

//   loginToKace().catch(err => res.send(err.response));
// })

function loginThenGetMachines(userName: string, password: string, res: express.Response) {
  login(userName, password)
    .then((loginCookies: any) =>
      getMachines(loginCookies)
        .then((getMachinesMessage) => {
          // console.log(getMachinesMessage);
          // res.set({ 'set-cookies': [ `login-token: ${token}`, `login-cookies: ${cookies}` ] });
          // res.cookie('login-token', token, { secure: false, httpOnly: true });
          res.setHeader('Set-Cookie', [ ...loginCookies ])
          // res.cookie('login-cookie', cookies, { secure: false, httpOnly: true });
          res.send(getMachinesMessage) })
        .catch(err => res.send(err.response)))
    .catch(err => res.send(err.error));
}

app.use((_, res: express.Response, next) => {
  res.setHeader('Access-Control-Allow-Origin', [
    'https://localhost:4321',
  ]);
  res.setHeader('Access-Control-Allow-Headers', ['*']);
  // res.setHeader('Access-Control-Expose-Headers', [
  //   'set-cookie',
  //   'x-dell-csrf-token'
  // ]);
  next();
});

app.use(cookieParser());

app.get('/machines', (req, res) => {

  // console.log(req.cookies);
  // console.log(req.headers['x-dell-csrf-token']);
  // console.log(req.headers['set-cookie']);
  // console.log(req.headers);

  // assuming basic auth
  // also assuming 'username:password'
  // TODO: maybe not assume?
  const authorizationHeader =
    typeof req.headers['authorization'] === 'string'
      ? req.headers['authorization'] as string
      : '';
  const beginPasswordIndexPosition = authorizationHeader.indexOf(' ') + 1;
  const encodedAuth = authorizationHeader.substring(beginPasswordIndexPosition);

  const decodedAuth = Buffer.from(encodedAuth, 'base64');
  const [userName, password] = decodedAuth.toString().split(':');

  // const KaceLoginCookies = [
  //   `kboxid=${req.cookies['kboxid']}`,
  //   `x-dell-auth-jwt=${req.cookies['x-dell-auth-jwt']}`,
  //   `KACE_CSRF_TOKEN=${req.cookies['KACE_CSRF_TOKEN']}`,
  //   `KACE_LAST_USER_SECURE=${req.cookies['KACE_LAST_USER_SECURE']}`,
  //   `KACE_LAST_ORG_SECURE=${req.cookies['KACE_LAST_ORG_SECURE']}`,
  // ]

  const kaceLoginCookies = Object.keys(req.cookies).map(key => `${key}=${req.cookies[key]}`)

  // (req.cookies as string[]).
  // console.log(req.cookies);
  // console.log(!deepEqual(req.cookies, {}));
  // console.log(!Object.is(req.cookies, {}));
  // console.log(Object.keys(req.cookies).length !== 0);
// || !token.expired
  console.log(cookie.parse(req.cookies['KACE_CSRF_TOKEN']));

  // loginToken && loginCookies
  // Object.keys(req.cookies).length !== 0
  kaceLoginCookies.length !== 0
    ? getMachines(kaceLoginCookies)
        .catch(err =>
          JSON.parse(err.response.body)['errorDescription'] === 'Expired token'
            ? loginThenGetMachines(userName, password, res)
            : res.send(err.response))
    : loginThenGetMachines(userName, password, res)
    // : login(userName, password)
    //     .then((loginCookies: any) =>
    //       getMachines(loginCookies)
    //         .then((getMachinesMessage) => {
    //           // console.log(getMachinesMessage);
    //           // res.set({ 'set-cookies': [ `login-token: ${token}`, `login-cookies: ${cookies}` ] });
    //           // res.cookie('login-token', token, { secure: false, httpOnly: true });
    //           res.setHeader('Set-Cookie', [ ...loginCookies ])
    //           // res.cookie('login-cookie', cookies, { secure: false, httpOnly: true });

    //           res.send(getMachinesMessage) })
    //         .catch(err => res.send(err.response)))
    //     .catch(err => res.send(err.error));

  // login(userName, password)
  //   .then(({ token, cookies }) =>
  //     getMachines(token, cookies)
  //       .then(machinesMessage => res.send(machinesMessage))
  //       .catch(err => res.send(err.response)))
  //   .catch(err => res.send(err.response));

  // const cookieJar = rp.jar();
  // const cookies =
  //   // (req.headers['set-cookie'] !== undefined
  //   //   ? req.headers['set-cookie'] as string[]
  //   //   : [])

  //     .map((cookieStr: string) => rp.cookie(cookieStr) as Cookie);
  // cookies.forEach((cookie: Cookie) => cookieJar.setCookie(cookie, fetchMachinesUrl));

  // async function getMachines(loginRes: express.Response) {

  //     // (req.headers['set-cookie'] !== undefined
  //     //   ? req.headers['set-cookie'] as string[]
  //     //   : [])

  //   const cookieJar = rp.jar();
  //   const cookies =
  //       (loginRes.getHeader('set-cookie') as string[] || [])
  //         .map((cookieStr: string) => rp.cookie(cookieStr) as Cookie);
  //   cookies.forEach((cookie: Cookie) => cookieJar.setCookie(cookie, fetchMachinesUrl));

  //   // console.log('getting inside here?');
  //   // console.log(`cookies: ${cookies}`);
  //   console.log(`cookie jar: ${cookieJar}`);

  //   const fetchMachines = {
  //     url: fetchMachinesUrl,
  //     method: 'GET',
  //     headers: {
  //       'x-dell-csrf-token': loginRes.getHeader('x-dell-csrf-token'),
  //       'x-dell-api-version': 5,
  //     },
  //     jar: cookieJar,
  //   };

  //   let machinesResponse;

  //   try {
  //     machinesResponse = await rp(fetchMachines);
  //   } catch ({ message }) {
  //     res.send(message);
  //   }

  //   // res.send(machinesResponse);
  //   return machinesResponse;
  // }

  // getMachines().catch(err => res.send(err.response));

});

app.listen(3003, () => console.log('listening on port 3003!'));
