var Botkit = require('botkit')
var request = require('request');


if (!process.env.token) {
  console.log('Error: Specify token in environment');
  process.exit(1);
}

var controller = Botkit.slackbot({
 debug: false
});

controller.spawn({
  token: process.env.token
}).startRTM(function(err) {
  if (err) {
    throw new Error(err);
  }
});

controller.hears(['hello','hi'],['direct_message','direct_mention','mention'],function(bot,message) {
    bot.reply(message,"Hello.");
});

controller.hears(['I am hungry'],['direct_message','direct_mention','mention'],function(bot,message) {
    bot.reply(message,"What do you want to have? Choose from one of it : KFC or Mcdonald");
});

controller.hears(['KFC','Mcdonald'],['direct_message','direct_mention','mention'],function(bot,message) {
    bot.reply(message,"Cool. Your meal will be delivered to you in 15mins. Stay tuned...");
});

controller.hears(['sports'],['ambient,direct_message','direct_mention','mention'],function(bot,message) {
    request('https://newsapi.org/v1/articles?source=bbc-sport&sortBy=top&apiKey=2f47566b0fc8471bb4e5becbd137da8c', function (error, response, body) {
  console.log('error:', error); // Print the error if one occurred
  console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
  console.log('body:', body); 
  
  var obj= JSON.parse (body)
  
  // Print the HTML for the Google homepage.
    var messageToSent = "" 
      
  for (i=0; i<obj["articles"].length; i++){
  var title = obj["articles"][i]["title"]
  var description = obj["articles"][i]["description"]
  var url = obj["articles"][i]["url"]
  messageToSent  += title + "\n" + description + "\n" + url + "\n"
  }

bot.reply(message,messageToSent); 

});
});
