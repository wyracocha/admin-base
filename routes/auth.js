var express = require('express');
var router = express.Router();

var isAuthenticated = require('../helper/isAuthenticated')

router.get('/', (req, res, next) => {
  req.session.authenticated ? res.redirect('/users') : res.render('auth/login')
})
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
      res.redirect('/login')
    }
  })
})
module.exports = router;
