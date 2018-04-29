// server.js
const jsonServer = require('json-server')
const server = jsonServer.create()
const router = jsonServer.router('db.json')
const middlewares = jsonServer.defaults()

server.use(middlewares)
server.use(router)

router.render = (req, res) => {
  const end = req.query.page * req.query.limit
  const start = end - req.query.limit

  const body = {
    tickets:
      res.locals.data.tickets
        .filter(t => t.Title.toLowerCase().includes(req.query.Title_like.toLowerCase())
                  && t.Status.includes(req.query.Status_like)),
    statuses: res.locals.data.statuses
  }

  if (req.query.pageCount === 'true') {
    res.send({
      ...body,
      tickets: body.tickets.filter((t, i) => i >= start && i < end),
      pageCount: Math.ceil(body.tickets.length / req.query.limit),
    })
  } else {
    res.send({
      ...body,
      tickets: body.tickets.filter((t, i) => i >= start && i < end)
    })
  }
}

server.listen(3000, () => {
  console.log('JSON Server is running')
})
