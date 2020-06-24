const { addSpaces } = require("../public/sentence-with-spaces.js");

test("addSpaces helper function can be imported", async function () {
  expect(typeof addSpaces).toBe("function");
});

test("addSpaces works", async function () {
  const output = addSpaces("checkValidityOf2Words");
  expect(output).toBe("check validity of 2 words");
});
