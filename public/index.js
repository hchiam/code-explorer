// avoid undefined if require() is undefined:
var say;
var sendShellCommand;
var getApi1LevelDeep;
if (typeof require !== "undefined") {
  const { say } = require("./say.js");
  const { sendShellCommand } = require("./shell.js");
  const { getApi1LevelDeep } = require("./api-search.js");
}

startup();

async function startup() {
  say("Up and running.");
  say("Running tests, excluding TFJS.");
  await runStartupTests();
  say("When you're done, remember to run yarn stop.");

  const api = getApi1LevelDeep(document.body);
  // const sentence = api[0].key; // document.body's api[0].key is "text"
  // say(`Getting embedding of ${sentence}.`);
  // const embedding = await embed1Sentence(sentence);
  // say("See console log.");
  // console.log(embedding);

  // setTimeout(async function () {
  //   say("Running python script.");
  //   await testPython();
  // }, 2000);
}

async function runStartupTests() {
  await sendShellCommand("jest --testPathIgnorePatterns tfjs", (result) => {
    say(`Test results: ${result}`);
  });
}

async function embed1Sentence(sentence, callback) {
  const embeddingResponse = await fetch("/embed1Sentence", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ sentence }),
  });
  const embeddingJson = await embeddingResponse.json();
  const embedding = await embeddingJson.embedding;
  if (callback) callback(embedding);
  return embedding;
}

async function testPython() {
  const response = await fetch("/python", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ scriptPath: "public/use.py" }),
  });
  const json = await response.json();
  const output = await json.result;
  say("output: " + output);
  return output;
}
