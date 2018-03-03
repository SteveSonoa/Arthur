var Twitter = require('twitter');

module.exports = function(twitterHandle) {


    var client = new Twitter({

        consumer_key: "FWGqF55QiOD5JzTIZhGdPu4Ac",
        consumer_secret: "3Q8vkpdJv5AFMHA8VOLE0KQJKYgneZUYclciWpFy5XiaxDmojQ",
        access_token_key: "34366368-aAtHhm6wCrKkJY6C6Wu6dbHfpvbRpyQWY21VG6GZ6",
        access_token_secret: "W21QNsRMIFFeS1YeNk6LC0Dn6oOqLzNsXtn1AsTK5dl7t"
    });
    // this is the param variable which will have key and value
    // is the count of it 

    var paramaters = {
        screen_name: twitterHandle,
        count: 3

    } // this is the param variable which will have key and value
    // is the count of it 
    

    // ,the key is the keyword which we are interested in searching and count 
    
    return client.get('statuses/user_timeline', paramaters);
}

