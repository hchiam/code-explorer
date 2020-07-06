const { google } = require("../public/google.js");

test("google helper function can be imported", async function () {
  expect(typeof google).toBe("function");
});

test("google results", async function () {
  const results = await google("js sort backwards");
  expect(results.length).toBe(3);
  expect(results[0].header).toBe(
    "JavaScript Array reverse() Method - W3Schools"
  );
  const linkStartsCorrectly = results[0].link
    .toLowerCase()
    .startsWith(
      "https://www.google.com//url?q=https://www.w3schools.com/jsref/jsref_reverse.asp"
    );
  expect(linkStartsCorrectly).toBe(true);
  expect(results[0].description).toBe(
    "The reverse() method reverses the order of the elements in an array. Note: this method will change the original array."
  );
});
