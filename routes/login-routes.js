// Require dependencies
const bcrypt = require('bcrypt');
const passport = require('passport');
const path = require("path");

// Require models
const db = require("../models");

// Passport routes
module.exports = function(app) {

    // Add to the 'Admin' table (via PostMan)
    app.post('/api/add-user', function(req, res) {
        
        if (req.body.username.length === 0){
            var error = "The email cannot be empty";
            return res.status(400).json({
                    status: 400, 
                    data: {
                        msg: error
                    }
                })
        }

        if (req.body.password.length === 0){
            var error = "The password cannot be empty";
            return res.status(400).json({
                    status: 400, 
                    data: {
                        msg: error
                    }
                })
        }
        const passwordEntered = req.body.password;
        // Create salt rounds, used to generate salt for 'bcrypt'
        const saltRounds = 10;
        // Generate a salt and a hash for password, using 'bcrypt'
        bcrypt.hash(passwordEntered, saltRounds).then(passwordHash => {
            // Create and add new employee to database
            db.User.create({
                fname: req.body.firstName,
                lname: req.body.lastName,
                linkedin:req.body.linkedInURL,
                username: req.body.username,
                password: passwordHash,
                
            }).then(function(data) {
                // After successful sign up, route to login area
                //res.redirect(200,'/api/login');
                // res.sendFile(path.join(__dirname + '/../public/recentSearch.html'));
                res.status(200).json({
                    status:200,
                    data: {}
                })

            }).catch(function(error){
                return res.status(400).json({
                    status: 400, 
                    data: {
                        msg: error.errors[0].message
                    }
                })
            });
        });

    });

    // Attempt to login
    app.post('/api/login', function(req, res) {

        const usernameEntered = req.body.username;
        const passwordEntered = req.body.password;
        console.log(usernameEntered);
        console.log(passwordEntered);

        // Search user table for user credentials
        db.User.findOne({
            where: {
                username: usernameEntered,
            }
        }).then(employee => {
            console.log('Employee: ' + employee);

            // Check if matching username was found in database
            if (employee === null) {
                let error = `Username '${usernameEntered}' does not exist.`;

                console.log(error);
                return res.json({
                    status: 404, 
                    data: {
                        msg: error
                    }
                })
                //res.redirect('/login');
            }
            else {
                // Compare password entered to password stored in database, using 'bcrypt'
                const validPassword = bcrypt.compareSync(passwordEntered, employee.password); // True or False

                if (validPassword) {
                    console.log('UserID: ' + employee.id);
                    req.login(employee.id, (err) => {
                        console.log('Password is valid! Open Sesame...');
                        // res.redirect('/recentSearch.html');
                        //res.sendFile(path.join(__dirname + '/../public/recentSearch.html'));
                        res.status(200).json({
                            status:200,
                            data: {}
                        })
                    });
                }
                else {
                    res.status(400).json({
                        status:400,
                        data: {
                            msg:"Password does not match"
                        }
                    })
                    
                }
            }
        });

    });

    // Login page
    app.get('/login', function(req, res) {
        // db.User.findAll({}).then(function(user) {
        //     res.json(user);
        // });
        res.sendFile(path.join(__dirname + '/../public/login.html'));
    });
    
    // Sign Up page
    app.get('/signUp', function(req, res) {
        
        res.sendFile(path.join(__dirname + '/../public/signUp.html'));
    });

    app.get('/recentSearch.html', function(req, res) {
        // db.User.findAll({}).then(function(user) {
        //     res.json(user);
        // });
        res.sendFile(path.join(__dirname + '/../public/recentSearch.html'));
        
    });
};


// Passport serialization
passport.serializeUser((user_id, done) => {
    done(null, user_id);
});

passport.deserializeUser((user_id, done) => {
    done(null, user_id);
});