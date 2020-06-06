require("@babel/register")({
  presets: ["@babel/preset-env"]
});

const express = require('express');
const path = require('path');
const helmet = require('helmet');
const requestHandler = require('./requestHandler');
const app = express();

//static files nd build file reference
app.use(express.static(path.join(__dirname, '../../../../build')));
app.use(express.static(path.join(__dirname, 'public')));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'public'));

app.disable('x-powered-by');

app.set('trust proxy', true);

app.use(helmet.hsts({
  maxAge: 31536000,
  includeSubDomains: true,
  preload: true,
  // removing below code to solve the socket hang up issue
  // setIf: function (req, res) {
  //   return req.secure;
  // }
}));

// app.use((req, res, next) => {
//   if (!req.secure) {
//     // res.redirect(301, "https://" + req.headers.host + req.originalUrl + "#");
//     return res.redirect('https://' + req.get('host') + req.url);
//   }
//   next();
// });

const httpProxy = require('http-proxy');
// REQUEST HANDLER FOR SERVER-SIDE RENDERING

//PROXY TO API
// logger.info(`this is the port ${process.env.API_PORT}`);
// const apiProxy = httpProxy.createProxyServer({
//   target: `http://localhost:${process.env.API_PORT}`,
// });

app.use(function (req, res, next) {
  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', '*');
  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  // Pass to next layer of middleware
  next();
});

// app.use('/api', (req, res) => {
//   apiProxy.web(req, res);
//   apiProxy.on('error', function (err, req, res) {
//   });
// });

//for server side rendering
app.use(requestHandler);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Notdff Found');
  err.status = 404;
  next(err);
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  // render the error page
  console.log('--- request error --- ', err);
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
