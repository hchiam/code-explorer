startup();

async function startup() {
  say("Up and running.", { sentenceCallback: console.log });
  await runShellCommand("yarn test");
  say("When you're done, remember to run yarn stop.");
}

function say(sentence, options) {
  if (sentence != "" && typeof responsiveVoice !== "undefined") {
    const sentenceCallback =
      options && options.sentenceCallback ? options.sentenceCallback : null;
    let rate = options && options.rate ? options.rate : 1.5;
    if (sentence.length > 30) {
      rate = 1;
    }
    if (sentence.length > 100) {
      rate = 0.9;
      sentence = "I've got a lot to tell you. " + sentence;
    }
    responsiveVoice.speak(sentence, "UK English Male", { rate: rate });
    if (sentenceCallback) sentenceCallback(sentence);
  }
}

async function runShellCommand(command) {
  say("Running " + command);
  const result = await sendShellCommand(command);
  say(`Result: ${result}`);
}

function getApi1LevelDeep(object) {
  const api = [];
  function getPropsSet(object) {
    // if (object == null) return [];
    const set = new Set();
    const propNames = Object.getOwnPropertyNames(object); // this works on Math
    propNames.forEach((p) => set.add(p));
    for (let prop in object) {
      // this works on document
      set.add(prop);
    }
    if (object.__proto__) {
      const objectProto = Object.getPrototypeOf(object.__proto__); // this works for NaN
      if (objectProto) {
        const morePropNames = Object.getOwnPropertyNames(objectProto);
        morePropNames.forEach((p) => {
          set.add(p);
        });
      }
    }
    return set.keys();
  }
  const keys = getPropsSet(object); // works on both Math and document
  for (let key of keys) {
    // api.push(key);
    const entry = { key: key, type: typeof object[key] };
    api.push(entry);
  }
  return api;
}

if (typeof exports !== "undefined") {
  if (typeof module !== "undefined" && module.exports) {
    module.exports = { getApi1LevelDeep };
  }
}
