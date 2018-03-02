// *********************************************************************************
// api-routes.js - this file offers a set of routes for displaying and saving data to the db
// *********************************************************************************
// Dependencies
// =============================================================
// Requiring our models
var db = require("../models");
// Routes
// =============================================================
module.exports = function(app) {
  // GET route for getting all of the posts
  app.get("/api/contact", function(req, res) {
    var query = {};
    if (req.query.contact_id) {
      query.ContactId = req.query.contact_id;
    }
    db.Contact.findAll({
      where: query
    }).then(function(dbContact) {
      res.json(dbContact);
    });
  });
  // Get rotue for retrieving a single post
  app.get("/api/contact/:id", function(req, res) {
    db.Post.findOne({
      where: {
        id: req.params.id
      }
    }).then(function(dbContact) {
      console.log(dbContact);
      res.json(dbContact);
    });
  });
  // POST route for saving a new post
  app.post("/api/contact", function(req, res) {
    db.Contact.create(req.body).then(function(dbContact) {
      res.json(dbContact);
    });
  });
  
};