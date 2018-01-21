var express = require('express');
var router = express.Router();
var isAuthenticated = require('../helper/isAuthenticated')
/* GET users listing. */
router.get('/', isAuthenticated, function(req, res, next) {
  res.send(`${req.session.id} - ${req.session.name} <a href="/users/logout">salir</a>`);
});
router.get('/login', (req, res, next) => {
  req.session.authenticated ? res.redirect('/users') : res.render('auth/login')
})
router.post('/login', (req, res, next) => {
  req.session.name = req.body.name || 'pepe'
  req.session.authenticated = true
  res.redirect('/users')
})
router.get('/logout', isAuthenticated, (req, res, next) => {
  req.session.destroy(function(err) {
    if (err) {
      res.render('error', {
        message: err.message
      })
    } else {
      res.redirect('/users/login')
    }
  })
})
module.exports = router;
