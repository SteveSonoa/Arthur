// Require the necessary packages
// const bodyParser = require('body-parser');
const Linkedin = require('node-linkedin')('86iqdrrwi4ttfs','Mi8cFFT1VKvypzTu','987654321');
const querystring = require('querystring');
const OauthParams = require('../config/OauthParams.js');
const fs = require('fs');
const http = require('https');

var myToken;
var linkedin;

// LinkedIn Routes
// =============================================================
module.exports = function(app) {
    // Again, `res` is optional, you could pass `code` as the first parameter 
    app.get('/auth', function (req, res) {
        // This is the redirect URI which linkedin will call to and provide state and code to verify
        /**
         *
         * Attached to the redirect_uri will be two important URL arguments that you need to read from the request:
         code — The OAuth 2.0 authorization code.
         state — A value used to test for possible CSRF attacks.
         */

        //TODO: validate state here to secure against CSRF
        var error = req.query.error;
        var error_description = req.query.error_description;
        var state = req.query.state;
        var code = req.query.code;
        if (error) {
            next(new Error(error));
        }
        /**
         *
         * The code is a value that you will exchange with LinkedIn for an actual OAuth 2.0 access
         * token in the next step of the authentcation process.  For security reasons, the authorization code
         * has a very short lifespan and must be used within moments of receiving it - before it expires and
         * you need to repeat all of the previous steps to request another.
         */
        //once the code is received handshake back with linkedin to send over the secret key
        handshake(req.query.code, res);
    });

    function handshake(code, ores) {

        //set all required post parameters
        var data = querystring.stringify({
            grant_type: "authorization_code",
            code: code,
            redirect_uri: OauthParams.redirect_uri,//should match as in Linkedin application setup
            client_id: OauthParams.client_id,
            client_secret: OauthParams.client_secret// the secret
        });

        var options = {
            host: 'www.linkedin.com',
            path: '/oauth/v2/accessToken',
            protocol: 'https:',
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Content-Length': Buffer.byteLength(data)
            }
        };
        
        var req = http.request(options, function (res) {
            var data = '';
            res.setEncoding('utf8');
            res.on('data', function (chunk) {
                data += chunk;

            });
            res.on('end', function () {
                //once the access token is received store it
                myToken = JSON.parse(data);
                linkedin = Linkedin.init(myToken.access_token || myToken.accessToken);
                ores.redirect("/");

            });
            req.on('error', function (e) {
                console.log("problem with request: " + e.message);
            });

        });
        req.write(data);
        req.end();
    }

    app.get('/company', function (req, res) {
        console.log(linkedin.connections.config.accessToken);
        linkedin.companies_search.name('facebook', 1, function(err, company) {
            console.log(company.companies.values[0]);


            // company = {
            //     companies: {
            //         _count: 1,
            //         _start: 0,
            //         _total: 140224,
            //         values: [
            //             [Object]
            //         ]
            //     }
            // }

            // name = company.companies.values[0].name;
            // desc = company.companies.values[0].description;
            // industry = company.companies.values[0].industries.values[0].name;
            // city = company.companies.values[0].locations.values[0].address.city;
            // websiteUrl = company.companies.values[0].websiteUrl;
            res.redirect("/");
        });
    });
};