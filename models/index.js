const mongoose = require('mongoose');
const mongoUri = process.env.MONGODB_URI || "mongodb://heroku_6m6rrqh8:i50us786vd33p8dupnk7g4udth@ds027521.mlab.com:27521/heroku_6m6rrqh8"; //sometimes the production send you the parameter without the link

mongoose
    .connect(mongoUri, {useNewUrlParser: true, useUnifiedTopology: true})
    .catch(() => process.exit(1));

require('./user');
require('./post');
require('./comment');

// without mongoose:
//const MongoClient = require('mongodb').MongoClient;
//
// function connect() {
//      // Connect to the db server:
//      return MongoClient.connect("mongodb://heroku_mjrklbvl:6an38k795kgunjropt3673dhm@ds033579.mlab.com:33579/heroku_mjrklbvl", {useUnifiedTopology: true})
//      // Connect to specific db inside server
//          .then(mongo => mongo.db('heroku_mjrklbvl'))
//          // close the app in case something is not working
//          .catch(() => process.exit(1));
// }
//
// module.exports = {
//      connect
// };
