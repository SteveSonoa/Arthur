var expect = require("chai").expect;


    // ,the key is the keyword which we are interested in searching and count 
    client.get('search/tweets', params, function(err, data, response) {
        if (err) {
            throw err;
            console.log("can't get tweets");
        }

        var tweets = data.statuses;
        for (var i = 0; i < tweets.length; i++) {
            var { created_at, text } = tweets[i];
            var { description } = tweets[i].user;
            // var created_at = tweets[i].created_at same as above
            tweetHolder.push({
                created_at,
                text,
                description
            });
        }
        
        console.log(tweetHolder);
    });
    