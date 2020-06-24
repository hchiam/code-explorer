// avoid undefined if require() is undefined:
var say;
var sendShellCommand;
var getApiTargetObject;
var getApi1LevelDeep;
var addSpaces;
if (typeof require !== "undefined") {
  const { say } = require("./say.js");
  const { sendShellCommand } = require("./shell.js");
  const { getApiTargetObject, getApi1LevelDeep } = require("./api-search.js");
  const { addSpaces } = require("./sentence-with-spaces.js");
}

startup();

async function startup() {
  say("Up and running.");

  say("Running tests, excluding TFJS.");
  await runStartupTests();

  say("Testing.", {
    sentenceCallback: async () => {
      const api = runApiTest();
      const sentence = addSpaces(api[0].key);
      console.log("embed this sentence:", sentence);
      const embedding = await embed1Sentence(sentence);
      console.log("embedding", embedding);
      say(
        `Embedding shown in console log for the following sentence: "${sentence}"`
      );
    },
  });

  // const sentence = api[0].key; // document.body's api[0].key is "text"
  // say(`Getting embedding of ${sentence}.`);
  // const embedding = await embed1Sentence(sentence);
  // say("See console log.");
  // console.log(embedding);

  // setTimeout(async function () {
  //   say("Running python script.");
  //   await testPython();
  // }, 2000);

  say("When you're done, remember to run yarn stop.");
}

async function runStartupTests() {
  await sendShellCommand("jest --testPathIgnorePatterns tfjs", (result) => {
    say(`Test results: ${result}`);
  });
}

function test() {
  console.log("api START");
  const api = runApiTest();
  console.log("api DONE");
  // const embedding = embed1Sentence(api[0]);
  // console.log(embedding);
}

function runApiTest() {
  const object = getApiTargetObject("button");
  const api = getApi1LevelDeep(object);
  console.log("API: ", api);
  const functionsCount = api.filter((x) => x.type === "function").length;
  const objectsCount = api.filter((x) => x.type === "object").length;
  console.log(
    `API has ${api.length} results, with ${functionsCount} functions and ${objectsCount} objects. Details in console log.`
  );
  return api;
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

async function embedAllSentences(sentences, callback) {
  const embeddingResponse = await fetch("/embedAllSentences", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ sentences }),
  });
  const embeddingJson = await embeddingResponse.json();
  const embeddingsObject = await embeddingJson.embeddingsObject;
  if (callback) callback(embeddingsObject);
  return embeddingsObject;
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
