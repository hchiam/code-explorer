function getApi1LevelDeep(object) {
  // uses isNaN to try to ignore indices of array, especially of strings
  const api = [];
  function getPropsSet(object) {
    // if (object == null) return [];
    const set = new Set();
    const propNames = Object.getOwnPropertyNames(object); // this works on Math
    propNames.forEach((p) => (isNaN(p) ? set.add(p) : ""));
    for (let prop in object) {
      if (isNaN(prop)) {
        set.add(prop); // this works on document
      }
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
    module.exports = {
      getApiTargetObject,
      getApi1LevelDeep,
    };
  }
}
