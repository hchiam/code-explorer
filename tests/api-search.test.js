const { getApi1LevelDeep } = require("../public/api-search.js");

test("the number of props", function () {
  expect(getApi1LevelDeep(Math).length).toBe(43);
  expect(getApi1LevelDeep(NaN).length).toBe(12);
  if (typeof document !== "undefined") {
    expect(getApi1LevelDeep(document).length).toBe(264);
  }
});
