'use strict';
/* 
  Import modules/files you may need to correctly run the script. 
  Make sure to save your DB's uri in the config file, then import it with a require statement!
 */
var fs = require('fs'),
    mongoose = require('mongoose'), 
    Schema = mongoose.Schema, 
    Listing = require('./ListingSchema.js'), 
    config = require('./config.js'),
    //file = require('./listings.json'),
    listingData = [];

/* Connect to your database */

var uristring = config.db.uri;

mongoose.connect(uristring, function (err, res) {
      if (err) {
      console.log ('ERROR connecting to: ' + uristring + '. ' + err);
      } else {
      console.log ('Succeeded connection to: ' + uristring);
      }
});


/* 
  Instantiate a mongoose model for each listing object in the JSON file, 
  and then save it to your Mongo database 
 */

mongoose.connection.on("connected", function(){
    //console.log("here");
    readFile();
});

var readFile = function(){
  fs.readFile('listings.json', 'utf8', function (err, data) {
    if (err) throw err;
    //console.log(data);
    listingData = JSON.parse(data);
    write();
  });
};


var write = function(){

  var entries = listingData["entries"];

  for(var i in entries){

    var temp = entries[i];
    var listingObj = new Listing(temp);

    listingObj.save(function (err) {
      if(err) throw err;
    
    console.log("success");
    }

)}};


/* 
  Once you've written + run the script, check out your MongoLab database to ensure that 
  it saved everything correctly. 
 */

