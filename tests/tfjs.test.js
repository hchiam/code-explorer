const {
  embedAllSentences,
  embed1Sentence,
  compareSentences,
  compareEmbeddings,
} = require("../public/tfjs.js");

const longerWaitForMachineLearningModel = 10000;

test("imported helper functions are available", async function () {
  expect(typeof embedAllSentences).toBe("function");
  expect(typeof embed1Sentence).toBe("function");
  expect(typeof compareSentences).toBe("function");
  expect(typeof compareEmbeddings).toBe("function");
});

test(
  "embedding",
  async function () {
    const embedding = await embed1Sentence("text");
    expect(typeof embedding).toBe("object");
  },
  longerWaitForMachineLearningModel
);
