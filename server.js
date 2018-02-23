// Require the necessary packages
var express = require('express');
var session = require("express-session");
var bodyParser = require('body-parser');
var passport = require('passport'), LocalStrategy = require('passport-local').Strategy;
var path = require('path');
// var cookieparser = require("cookieparser");

// Sync to the DB before starting the server
var db = require("./models");
db.sequelize.sync();

var PORT = process.env.PORT || 3000;
var app = express();

// Setup Passport session requirements
// app.use(cookieparser());
app.use(session({ secret: 'cats' }));
app.use(passport.initialize());
app.use(passport.session());

// Serve static content for the app from the "public" directory in the application directory.
app.use(express.static("public"));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

// Set Handlebars.
// var exphbs = require("express-handlebars");

// app.engine("handlebars", exphbs({ defaultLayout: "main" }));
// app.set("view engine", "handlebars");

// Routes
// =============================================================
// app.post('/login', passport.authenticate('local'), function(req, res) {
// 	// If this function gets called, authentication was successful.
// 	// `req.user` contains the authenticated user.
// 	res.redirect('/users/' + req.user.username);
// });

// Basic route that sends the user to the survey page
app.get("/", function(req, res) {
	res.sendFile(path.join(__dirname, "login_form.html"));
});

app.post('/login', passport.authenticate('local', {
	successRedirect: '/',
	failureRedirect: '/login',
	failureFlash: true
}));

app.listen(PORT, function() {
  console.log("App now listening at localhost:" + PORT);
});
