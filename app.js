const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const logger = require('morgan');

const usersRouter = require('./routes/users');

// env
if (process.env.NODE_ENV !== 'production') {
  const env = require('node-env-file');
  env(__dirname + '/env/.env');
}
const uri = process.env.URI;

const app = express();

console.log(`server running on port ${process.env.PORT}`);

// middleware
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// static
app.use(express.static(path.join(__dirname, "client/build")));
// app.use('/images', express.static(path.join(__dirname, "/public/img/")));

// routes
app.use('/users', usersRouter);

// db connect
mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}, function (err) {
  if (err) throw err;
  console.log('Successfully connected');
});

// every route not mentioned before goes to the single-page app
app.get('*', (req, res) => {
  res
    .header('Content-Type', 'text/html')
    .sendFile(path.join(__dirname, "client/build", "index.html"));
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
