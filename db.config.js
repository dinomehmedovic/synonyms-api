const { MongoClient } = require("mongodb");
const connectionString = process.env.DB_URI;
const client = new MongoClient(connectionString);

let dbConnection;

module.exports = {
  connectToDatabase: function (callback) {
      client.connect().then((db) => {
        dbConnection = db.db(process.env.DATABASE);
        console.log("Successfully connected to MongoDB.");
      }, (error) => {
        console.error("Error while trying to connected to MongoDB.", error);
        process.exit(1);
      }).catch((error) => {
        console.error("Error while trying to connected to MongoDB.", error);
        process.exit(1);
      });
  },

  getDb: function () {
    return dbConnection;
  },
};