require("@tensorflow/tfjs-node");
const use = require("@tensorflow-models/universal-sentence-encoder"); // U.S.E.

async function embedAllSentences(inputSentences) {
  /**
   * usage:
   * const embeddingsObject = await embedAllSentences(["hi", "hello", "this is cool"]);
   * const embedding1 = embeddingsObject["hi"];
   */

  if (!Array.isArray(inputSentences) || typeof inputSentences === "string") {
    return {};
  }

  const sentences = inputSentences.map((s) => camelCaseToSpaces(s));

  return await use.load().then((model) => {
    return model.embed(sentences).then((embeds) => {
      const embeddings = embeds.arraySync();
      let embeddingsObject = {};
      for (let i = 0; i < embeddings.length; i++) {
        embeddingsObject[sentences[i]] = embeddings[i];
      }
      return embeddingsObject;
    });
  });
}

async function embed1Sentence(inputSentence) {
  /**
   * usage:
   * const embeddingObject = await embed1Sentence('hello there');
   * const embedding = embeddingObject["hello there"];
   */

  if (typeof inputSentence !== "string") return {};

  const sentence = camelCaseToSpaces(inputSentence);

  return await use.load().then((model) => {
    return model.embed([sentence]).then((embeds) => {
      const embedding = embeds.arraySync()[0];
      const embeddingObject = {};
      embeddingObject[sentence] = embedding;
      return embeddingObject;
    });
  });
}

function camelCaseToSpaces(sentence) {
  // try this: camelCaseToSpaces('thisIsAGoodIDMatchFor   myIDChecker')
  return sentence
    .replace(/\s+/g, " ") // a   b -> a b
    .replace(/([a-z])([A-Z])/g, "$1 $2") // aA -> a A
    .replace(/([A-Z]+)([A-Z])([a-z])/g, "$1 $2$3"); // IDMap -> ID Map
}

async function compareSentences(sentence1, sentence2) {
  /**
   * usage:
   * const similarityPercent = await compareSentences(sentence1, sentence2);
   */

  const sentencePair = [sentence1, sentence2];
  if (typeof sentence2 === "undefined" && Array.isArray(sentence1)) {
    sentencePair[0] = sentence1[0];
    sentencePair[1] = sentence1[1];
  }

  const similarityPercent = await use.load().then(async (model) => {
    return await model.embed(sentencePair).then(async (embeddings) => {
      const embeds = await embeddings.arraySync();
      return await compareEmbeddings(embeds[0], embeds[1]);
    });
  });
  return similarityPercent;
}

async function compareEmbeddings(embedding1, embedding2) {
  /**
   * usage:
   * const similarityPercent = await compareEmbeddings(embeddingsObject["hi"], embeddingsObject["hello"]);
   */

  // much faster than compareSentences since not embedding
  const similarityDecimal = await cosineSimilarity(embedding1, embedding2);
  // cosine similarity -> % when doing text comparison, since cannot have -ve term frequencies: https://en.wikipedia.org/wiki/Cosine_similarity
  const similarityPercent = Math.round(similarityDecimal * 100 * 100) / 100;
  return similarityPercent;
}

async function cosineSimilarity(a, b) {
  // https://towardsdatascience.com/how-to-build-a-textual-similarity-analysis-web-app-aa3139d4fb71

  const magnitudeA = await Math.sqrt(dotProduct(a, a));
  const magnitudeB = await Math.sqrt(dotProduct(b, b));
  if (magnitudeA && magnitudeB) {
    // https://towardsdatascience.com/how-to-measure-distances-in-machine-learning-13a396aa34ce
    return (await dotProduct(a, b)) / (magnitudeA * magnitudeB);
  } else {
    return 0;
  }
}

function dotProduct(a, b) {
  let sum = 0;
  for (let i = 0; i < a.length; i++) {
    sum += a[i] * b[i];
  }
  return sum;
}

if (typeof exports !== "undefined") {
  if (typeof module !== "undefined" && module.exports) {
    module.exports = {
      embedAllSentences,
      embed1Sentence,
      compareSentences,
      compareEmbeddings,
    };
  }
}
