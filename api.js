var fs = require('fs'),
  https = require('https'),
  jsonServer = require('json-server'),
  server = jsonServer.create(),
  middlewares = jsonServer.defaults();

var options = {
  key: fs.readFileSync('./ssl/key.pem'),
  cert: fs.readFileSync('./ssl/cert.pem')
};

server.use(middlewares);

// login stuff
server.use(jsonServer.bodyParser)
server.use((req, res, next) => {
  if (req.method == 'POST' && req.path == '/login') {
    if (req.body.userName === process.env.API_USER &&
        req.body.password === process.env.API_PASS) {
      res.setHeader('Access-Control-Expose-Headers', 'x-dell-csrf-token')
      res.setHeader('x-dell-csrf-token', 'test-token')
      res.status(200).json({ account: { id: 553, fullName: 'Kurt Lippert' }})
      res.end()
    } else {
      res.status(400).json({ message: 'invalid credentials' })
    }
  } else if (req.method == 'GET' && req.path == '/machines') {
    if (req.get('x-dell-csrf-token') == 'test-token') {
      res.status(200).json(
        {
          Other_Property: '',
          Machines: [
            {
              Name: 'm1',
              Os_name: 'windows 10',
              User: 'user1'
            },
            {
              Name: 'm2',
              Os_name: 'os x',
              User: 'user2'
            },
            {
              Name: 'm3',
              Os_name: 'solaris',
              User: 'user3'
            }
          ]
        })
    }
    else {
      res.status(400).json({ message: 'invalid token' })
    }
  } else {
    next()
  }
})

https.createServer(options, server).listen(3002, function() {
  console.log("json-server started on port " + 3002);
})
