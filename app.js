var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var lessMiddleware = require('less-middleware');
var session = require('express-session')
var exphbs = require('express-handlebars')
var csrf = require('csurf')
var helmet = require('helmet')

var users = require('./routes/users');
var auth = require('./routes/auth');
var app = express();
async function Setup () {
  try {
    // view engine setup
    app.set('views', path.join(__dirname, 'views'));
    // hbs config
    app.engine('.hbs', exphbs({
      extname: '.hbs',
      layoutsDir: 'views/layouts',
      partialsDir: 'views/partials',
      defaultLayout: 'layout'
    }));
    app.set('view engine', '.hbs');
    // uncomment after placing your favicon in /public
    //app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
    app.use(logger('dev'));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(cookieParser());
    app.use(lessMiddleware(path.join(__dirname, 'public')));
    app.use(express.static(path.join(__dirname, 'public')));
    // - cookie config
    var sess = {
      secret: process.env.SECRET,
      cookie: {
        httpOnly: true
      },
      saveUninitialized: false,
      resave: false
    }
    if (app.get('env') === 'production') {
      app.set('trust proxy', 1) // trust first proxy
      sess.cookie.secure = true // serve secure cookies
    }
    app.use(session(sess))
    // - end cookie config
    // - csrf
    app.use(csrf({ cookie: true }));
    // - end csrf
    app.use('/users', users);
    app.use('/', auth)
    // catch 404 and forward to error handler
    app.use(function(req, res, next) {
      var err = new Error('Not Found');
      err.status = 404;
      next(err);
    });
    // adding helment
    app.use(helmet({
      frameguard: {action: 'deny'}
    }))
    // error handler
    app.use(function(err, req, res, next) {
      // set locals, only providing error in development
      res.locals.message = err.message;
      res.locals.error = req.app.get('env') === 'development' ? err : {};
      // render the error page
      res.status(err.status || 500);
      res.render('error');
    });
    return new Promise((resolve, reject) => {
      resolve()
    })
  } catch (e) {
    return new Promise((resolve, reject) => {
      reject(new Error(e.message))
    })
  }
}
async function Gurure() {
  try {
    await Setup()
  } catch (e) {
    return new Promise((resolve, reject) => {
      reject(new Error(e.message))
    })
  }
}
Gurure()
module.exports = app;
