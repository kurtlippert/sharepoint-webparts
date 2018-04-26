// hello.js
module.exports = (req, res, next) => {
  // res.header('X-Hello', 'World')
  console.log(req)
  console.log(res)
  next()
}
