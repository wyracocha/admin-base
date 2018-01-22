var express = require('express');
var router = express.Router();
var isAuthenticated = require('../helper/isAuthenticated')
/* GET users listing. */
router.get('/', isAuthenticated, function(req, res, next) {
  //res.send(`${req.session.id} - ${req.session.name} <a href="/logout">salir</a>`);
  res.render('index', {
    layout: 'admin'
  })
});
module.exports = router;
