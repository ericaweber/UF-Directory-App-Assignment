/* Fill out these functions using Mongoose queries*/
var mongoose = require('mongoose'), 
    Schema = mongoose.Schema, 
    Listing = require('./ListingSchema.js'), 
    config = require('./config.js');

var uristring = config.db.uri;

mongoose.connect(uristring, function (err, res) {
      if (err) {
      console.log ('ERROR connecting to: ' + uristring + '. ' + err);
      } else {
      console.log ('Succeeded connection to: ' + uristring);
      }
});


mongoose.connection.on("connected", function(){
    //console.log("here");
    //updatePhelpsLab();
});

var findLibraryWest = function() {
  /* 
    Find the document that contains data corresponding to Library West,
    then log it to the console. 
   */

   // get a listing with name of Library West
    Listing.find({ name: 'Library West' }, function(err, listing) {
      if (err) throw err;

      // show the one listing
      console.log(listing);
    });
};
var removeCable = function() {
  /*
    Find the document with the code 'CABL'. This cooresponds with courses that can only be viewed 
    on cable TV. Since we live in the 21st century and most courses are now web based, go ahead
    and remove this listing from your database and log the document to the console. 
   */
  Listing.findOneAndRemove({ code: 'CABL' }, function(err) {
    if (err) throw err;

    // we have deleted the listing
    console.log('Listing deleted!');
  });
};
var updatePhelpsLab = function() {
  /*
    Phelps Laboratory's address is incorrect. Find the listing, update it, and then 
    log the updated document to the console. 
   */
    Listing.findOneAndUpdate({ name: 'Phelps Laboratory' }, { address: '1275 Center Drive Gainesville, FL 32611-6131' }, function(err, listing) {
      if (err) throw err;

      // we have the updated listing returned to us
      console.log(listing);
    });

};
var retrieveAllListings = function() {
  /* 
    Retrieve all listings in the database, and log them to the console. 
   */
   // get all the listings
    Listing.find({}, function(err, listings) {
      if (err) throw err;

      // object of all the listings
      console.log(listings);
    });
};

findLibraryWest();
removeCable();
updatePhelpsLab();
retrieveAllListings();
