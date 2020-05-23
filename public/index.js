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

function startup() {
  say("Up and running.", {
    sentenceCallback: (message) => {
      console.log(message, true);
    },
  });
  console.log("Running startup tests.", true);
  say("Running startup tests.");
  setTimeout(async () => {
    await runStartupTests();
    say("When you're done, remember to run yarn stop.");
  }, 1000);
}

async function runStartupTests() {
  await sendShellCommand("yarn test", (result) => {
    say(`Result: ${result}`, {
      sentenceCallback: (message) => {
        console.log(message, true);
      },
    });
  });
}
