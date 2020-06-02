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
  say("Up and running.", {
    sentenceCallback: (message) => {
      console.log(message, true);
    },
  });
  console.log("Running tests.", true);
  say("Running tests.");
  await runStartupTests();
  say("When you're done, remember to run yarn stop.");

  const api = getApi1LevelDeep(document.body);
  const sentence = api[0].key; // document.body's api[0].key is "text"
  say(`Getting embedding of ${sentence}.`);
  const embedding = await embed1Sentence(sentence);
  say("The embedding should be displayed in the console log.");
  console.log(embedding, true);
  say("Running python script.");
  await testPython();
}

async function runStartupTests() {
  await sendShellCommand("yarn test", (result) => {
    const tellUser = `Result: ${result}`;
    console.log(tellUser);
    say(tellUser);
  });
}

async function embed1Sentence(sentence, callback) {
  const embedding = await fetch("/embed1Sentence", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ sentence }),
  })
    .then((res) => res.json())
    .then((res) => {
      return res.embedding;
    });
  if (callback) callback(embedding);
  return embedding;
}

async function testPython() {
  const output = await fetch("/python", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ scriptPath: "public/use.py" }),
  })
    .then((res) => res.json())
    .then((res) => {
      return res.result;
    });
  console.log(`output: ${output}`, true);
  say("output: " + output);
  return output;
}
