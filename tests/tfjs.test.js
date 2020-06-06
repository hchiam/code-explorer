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
  "embedding 1 sentence",
  async function () {
    const sentence = "text";
    const embeddingObject = await embed1Sentence(sentence);
    const embedding = embeddingObject[sentence];
    expect(Array.isArray(embedding)).toBe(true);
    expect(embedding.length).toBe(512);
    expect(typeof embedding[0]).toBe("number");
  },
  longerWaitForMachineLearningModel
);
