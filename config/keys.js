console.log('this is loaded');

  exports.twitter = {
  consumer_key: process.env.TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
  access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
};

exports.linkedIn = {
  client_id: process.env.LINKEDIN_ID,
 client_secret: process.env.LINKEDIN_SECRET
};

exports.NYTimes = {

	NYTIMES_API_KEY: process.env.NYTIMES_API_KEY
}


// module.exports = {
// 	twitter: twitter, 
// 	spotify: spotify,
// 	omdb: omdb
// }