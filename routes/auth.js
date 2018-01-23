var express = require('express');
var router = express.Router();

var csrf = require('csurf')
var csrfProtection = csrf({ cookie: true })

var isAuthenticated = require('../helper/isAuthenticated')

router.get('/',  (req, res, next) => {
  req.session.authenticated ? res.redirect('/users') : res.render('auth/login' ,{ csrfToken: req.csrfToken() })
})
router.get('/login', (req, res, next) => {
  req.session.authenticated ? res.redirect('/users') : res.render('auth/login', { csrfToken: req.csrfToken() })
})
router.post('/login', (req, res, next) => {
  if (req.body.email === process.env.ADMIN_EMAIL && req.body.password === process.env.ADMIN_PASSWORD) {
    req.session.authenticated = true
    res.redirect('/users')
  } else {
    res.render('auth/login', { 
      csrfToken: req.csrfToken(),
      message: 'invalid user or password'
    })
  }
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
