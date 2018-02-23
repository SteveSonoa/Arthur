// Require dependencies
const bcrypt = require('bcrypt');
const passport = require('passport');

// Require models
const db = require("../models");

// Passport routes
module.exports = function(app) {

    // Add to the 'Admin' table (via PostMan)
    app.post('/api/add-admin', function(req, res) {
        
        const passwordEntered = req.body.password;
        // Create salt rounds, used to generate salt for 'bcrypt'
        const saltRounds = 10;
        // Generate a salt and a hash for password, using 'bcrypt'
        bcrypt.hash(passwordEntered, saltRounds).then(passwordHash => {
            // Create and add new employee to database
            db.Admin.create({
                username: req.body.username,
                password: passwordHash,
                admin: req.body.admin
            }).then(function(data) {
                // After successful login, route to /admin area
                res.redirect('/admin');
                console.log(data);
            });
        });

    });

    // Attempt to login
    app.post('/api/login', function(req, res) {

        const usernameEntered = req.body.username;
        const passwordEntered = req.body.password;
        console.log(usernameEntered);
        console.log(passwordEntered);

        // Search admin table for user credentials
        db.Admin.findOne({
            where: {
                username: usernameEntered,
            }
        }).then(employee => {
            console.log('Employee: ' + employee);

            // Check if matching username was found in database
            if (employee === null) {
                console.log(`Could not find username '${usernameEntered}' in database.`);
                res.redirect('/login');
            }
            else {
                // Compare password entered to password stored in database, using 'bcrypt'
                const validPassword = bcrypt.compareSync(passwordEntered, employee.password); // True or False

                if (validPassword) {
                    console.log('UserID: ' + employee.id);
                    req.login(employee.id, (err) => {
                        console.log('Password is valid! Open Sesame...');
                        res.redirect('/admin');
                    });
                }
                else {
                    console.log('Password does not match');
                    res.redirect('/login');
                }
            }
        });

    });

    // Login page
    app.get('/api/login', function(req, res) {
        db.Admin.findAll({}).then(function(user) {
            res.json(user);
        });
    });

};

// Passport serialization
passport.serializeUser((user_id, done) => {
    done(null, user_id);
});

passport.deserializeUser((user_id, done) => {
    done(null, user_id);
});