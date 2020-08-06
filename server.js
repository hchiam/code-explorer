const { readJson } = require("./public/read-files.js");
// const { connectToDb } = require("./public/use-db.js");
const { runShellCommand } = require("./public/shell.js");
const {
  getClosest,
  embedAllSentences,
  embed1Sentence,
  // compareSentences,
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
  // connectToDb();
});

app.route("/shell").post(function (req, res) {
  const command = req.body.command;
  if (!command) return;
  console.log(`shell command: ${command}`);
  const output = runShellCommand(command);
  console.log(`Result: ${output}`);
  res.send({ result: output });
});

app.route("/python").post(function (req, res) {
  const scriptPath = req.body.scriptPath;
  if (!scriptPath) return;
  console.log(`python script: ${scriptPath}`);
  const spawn = require("child_process").spawn;
  const process = spawn("python", [scriptPath]);
  process.stdout.on("data", function (data) {
    const output = data.toString();
    console.log(`Result: ${output}`);
    res.send({ result: output });
  });
});

app.route("/embed1Sentence").post(async function (req, res) {
  const sentence = req.body.sentence;
  if (!sentence) return;
  console.log(`getting embedding for this sentence: ${sentence}`);
  const embeddingObject = await embed1Sentence(sentence);
  const embedding = embeddingObject[sentence];
  console.log("Embedding retrieved.");
  res.send({ embedding });
});

app.route("/embedAllSentences").post(async function (req, res) {
  const sentences = req.body.sentences;
  if (!sentences) return;
  console.log(`getting embeddings for ${sentences.length} sentences.`);
  const embeddingsObject = await embedAllSentences(sentences);
  console.log("Embeddings retrieved.");
  res.send({ embeddingsObject });
});

app.route("/getClosest").post(async function (req, res) {
  const sentence = req.body.sentence;
  const embeddingsObject = req.body.embeddingsObject;
  if (!sentence) return;
  console.log(
    `getting sentence with closest embedding to this sentence: ${sentence}`
  );
  const closestSentence = await getClosest(sentence, embeddingsObject);
  console.log(`Closest sentence: ${closestSentence}`);
  res.send({ closestSentence });
});
