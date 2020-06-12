const mongo = require("mongodb").MongoClient;
const dbUrl = "mongodb://localhost:27017";
const dbName = "takeaways";
const collectionName = "takeaways";

function connectToDb() {
  mongo.connect(dbUrl, function (err, client) {
    if (err) throw err;
    const db = client.db(dbName);
    connectToCollection(client, db, collectionName);
  });
}

function connectToCollection(client, db, collectionName) {
  db.createCollection(collectionName, function (err, res) {
    if (err) throw err;
    console.log("collection created");
    client.close();
  });
}

function insertIntoCollection(client, db, collectionName, data) {
  // example data = { name: 'Company 123', address: '123 Somewhere Street' };
  db.collection(collectionName).insertOne(data, function (err, res) {
    if (err) throw err;
    console.log("1 document inserted");
    client.close();
  });
}

function deleteFromCollection(client, db, collectionName, query) {
  // example query = { name: { $regex: /Company/ } };
  db.collection(collectionName).deleteMany(query, function (err, obj) {
    if (err) throw err;
    console.log(`${obj.result.n} document(s) deleted`);
    client.close();
  });
}

if (typeof exports !== "undefined") {
  if (typeof module !== "undefined" && module.exports) {
    module.exports = {
      connectToDb,
      insertIntoCollection,
      deleteFromCollection,
    };
  }
}
