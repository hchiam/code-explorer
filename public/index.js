say("Interface up and running.", console.log);

function say(sentence, sentenceCallback) {
  if (sentence != "") {
    responsiveVoice.speak(sentence, "UK English Male");
    if (sentenceCallback) sentenceCallback(sentence);
  }
}

function getApi1LevelDeep(object) {
  const api = [];
  const set = new Set();
  function getPropsSet(object) {
    const propNames = Object.getOwnPropertyNames(object); // this works on Math
    propNames.forEach((p) => set.add(p));
    for (let prop in object) {
      // this works on document
      set.add(prop);
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
