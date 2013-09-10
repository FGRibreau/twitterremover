module.exports = {
  // Your twitter username
  username:'username',
  // Your own Twitter app consumer/secret & access_token/secret
  //  for your account `username`
  oauth:{
    consumer_key: 'CONSUMER_KEY'
  , consumer_secret: 'CONSUMER_SECRET'
  , token: 'TOKEN'
  , token_secret: 'TOKEN_SECRET'
  },
  // Topsy API key
  apikey: '09C43A9B270A470B8EB8F2946A9369F3',
  // Number of tweets to retrieve from topsy API
  perpage: 20000,
  // Only remove returned tweets from Topsy that are before
  beforeDate: new Date(2011, 0, 1)
};
