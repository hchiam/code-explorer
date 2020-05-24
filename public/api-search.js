function getApi1LevelDeep(object) {
  const api = [];
  function getPropsSet(object) {
    // TODO: don't index whole array of string
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
