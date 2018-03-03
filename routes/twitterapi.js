var Twitter = require('twitter');
var Q = require('q');
module.exports = function(app) {


    var client = new Twitter({

        consumer_key: "FWGqF55QiOD5JzTIZhGdPu4Ac",
        consumer_secret: "3Q8vkpdJv5AFMHA8VOLE0KQJKYgneZUYclciWpFy5XiaxDmojQ",
        access_token_key: "34366368-aAtHhm6wCrKkJY6C6Wu6dbHfpvbRpyQWY21VG6GZ6",
        access_token_secret: "W21QNsRMIFFeS1YeNk6LC0Dn6oOqLzNsXtn1AsTK5dl7t"
    });
    // this is the param variable which will have key and value
    // is the count of it 
    var tweetHolder = [];

    app.get('/results', function(req, res) {
        // ,the key is the keyword which we are interested in searching and count 
        var params = {
            q: req.body.twitterHandle,
            count: 3
        }
        client.get('statuses/user_timeline', params, function(err, data, response) {
            if (err) {
                throw err;
                console.log("can't get tweets");
            }
            //var tweets = data;
            //console.log(data)
            //if (user.screen_name) === hzoba {
            for (var i = 0; i < data.length; i++) {
                var { created_at, text } = data[i];

                // var created_at = tweets[i].created_at same as above
                tweetHolder.push({
                    created_at,
                    text,

                });
            }


            var { description } = data[0].user;
            var { profile_image_url } = data[0].user
            tweetHolder.push({
                description,
                profile_image_url

            });
            console.log(tweetHolder);

        });
    });
}