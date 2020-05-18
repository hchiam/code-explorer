const fs = require("fs");

const mongo = require("mongodb").MongoClient;
const dbUrl = "mongodb://localhost:27017";
const dbName = "takeaways";
const collectionName = "takeaways";

const { runShellCommand } = require("./public/shell.js");

const express = require("express");
const app = express();

const port = process.env.PORT || 8000;
app.listen(port, function () {
  console.log(`port ${port}`);
});

app.use(express.json());
app.use("/public", express.static(process.cwd() + "/public"));
app.use("/styles", express.static(process.cwd() + "/styles"));
app.use("/views", express.static(process.cwd() + "/views"));

app.route("/").get(function (req, res) {
  console.log("GET");
  res.sendFile(process.cwd() + "/views/index.html");
  readJson("takeaways.json");
  connectToDb();
});

app.route("/shell").post(function (req, res) {
  const command = req.body.command;
  if (!command) return;
  console.log(`shell command: ${command}`);
  const output = runShellCommand(command);
  res.send({ result: output });
});

function readJson(filePath) {
  filePath = filePath.toString();
  if (filePath.endsWith(".json")) {
    const data = JSON.parse(readFile(filePath, "utf8"));
    console.log(data);
  } else {
    console.log(`Is file ${filePath} a JSON file?`);
  }
}

function readFile(filePath) {
  return fs.readFileSync(filePath, "utf8");
}

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
