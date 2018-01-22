module.exports = (req, res, next ) => {
  req.session.authenticated ? next() : res.redirect('/login')
}