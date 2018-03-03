const passport = require('passport');
const path = require("path");
const twitterHelper = require("./twitterHelper.js");
const nytimesHelper = require("./nytimesHelper.js");
// Require models
const db = require("../models");

var Q = require("q");

function parseTweets(data) {
    var tweets = {};

    var { description, profile_image_url } = data[0].user;


    tweets.description = description;
    tweets.profile_image_url = profile_image_url;

    tweets.data = []

    for (var i = 0; i < data.length; i++) {
        var { created_at, text } = data[i];


        tweets.data.push({
            created_at,
            text,

        });
    }

    return tweets;


}

function parseNYTArticles(data) {
    var NYTData = data.response.docs;
    var NYTArticles = [];

    NYTData.forEach(function(article) {
        var { pub_date, snippet, web_url, headline } = article;
        var print_headline = headline.print_headline;
        NYTArticles.push({
            print_headline,
            pub_date,
            snippet,
            web_url
        })

    })

    return NYTArticles;

}

module.exports = function(app) {

    app.post("/api/socialmedia", function(req, res) {

        var twitterHandle = req.body.twitterHandle;
        var companyName = req.body.companyName;

        var promises = [twitterHelper(twitterHandle), nytimesHelper(companyName) /*, linkedIn, */ ];
        Q.allSettled(promises)
            .then(function(results) {
                var response = {
                    status: 200,
                    data: {
                        twitter: [],
                        nytimes: []
                    }
                }

                var msg = "";


                response.data.twitter.push(parseTweets(results[0].value));


                response.data.nytimes.push(parseNYTArticles(results[1].value));

                res.json(response)
            });
    })
}