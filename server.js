const { readJson } = require("./public/read-files.js");
const { connectToDb } = require("./public/use-db.js");
const { runShellCommand } = require("./public/shell.js");
const {
  embedAllSentences,
  embed1Sentence,
  compareSentences,
  compareEmbeddings,
} = require("./public/tfjs.js");

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
  console.log(`Result: ${output}`);
  res.send({ result: output });
});

app.route("/embed1Sentence").post(async function (req, res) {
  const sentence = req.body.sentence;
  if (!sentence) return;
  console.log(`getting embedding for this sentence: ${sentence}`);
  const embedding = await embed1Sentence(sentence);
  console.log(`Embedding: ${embedding}`);
  res.send({ embedding });
});
