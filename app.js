var express = require('express'),
    path = require('path'),
    restful = require('node-restful'),
    mongoose = restful.mongoose;
// var facebook = require('./facebook.js');
// var https = require('https');
var request = require('request');
var app      = express();
var port     = process.env.PORT || 3000;
var mongoose = require('mongoose');
var passport = require('passport');
var flash    = require('connect-flash');

var User = require('./app/models/user');

var configDB = require('./config/database.js');

app.use(express.bodyParser());
app.use(express.query());

// configuration ===============================================================
mongoose.connect(configDB.url); // connect to our database

require('./config/passport')(passport); // pass passport for configuration

app.configure(function() {

  app.use(express.static(path.join(__dirname, 'public')));
  app.use(express.favicon(path.join(__dirname, 'public/graphics/favicon.ico'))); 

    // express
    app.use(express.logger('dev')); // log every request to the console
    app.use(express.cookieParser()); // read cookies (needed for auth)
  app.use(express.cookieSession({ secret: 'RcWudEyiRGh3VQMp6Yzk' }));
    app.use(express.bodyParser()); // get information from html forms
    // app.set('view engine', 'jade'); // set up ejs for templating

    // passport
    app.use(express.session({ secret: 'kCfPusdpqme6cwc9UgpA' })); // session secret
    app.use(passport.initialize());
    app.use(passport.session()); // persistent login sessions
    app.use(flash()); // use connect-flash for flash messages stored in session

});