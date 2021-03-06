require("@tensorflow/tfjs-node");
const use = require("@tensorflow-models/universal-sentence-encoder"); // U.S.E.

async function getClosest(inputSentence, embeddingsObject) {
  /**
   *
   * TODO:
   *
   * replace with something like the python get_nns_by_vector
   *
   **/

  const namesAndSimilarities = [];

  const sentenceEmbeddingObject = await embed1Sentence(inputSentence);
  const sentenceEmbedding =
    sentenceEmbeddingObject[Object.keys(sentenceEmbeddingObject)];
  const arrayOfEmbeddingsObjects = Object.keys(embeddingsObject).map((key) => {
    return { name: key, embedding: embeddingsObject[key] };
  });
  for (let i = 0; i < arrayOfEmbeddingsObjects.length; i++) {
    const otherEmbeddingObject = arrayOfEmbeddingsObjects[i];
    const otherEmbedding =
      otherEmbeddingObject[Object.keys(otherEmbeddingObject)];
    const otherEmbeddingName = Object.keys(otherEmbeddingObject);
    const similarityPercent = await compareEmbeddings(
      sentenceEmbedding,
      otherEmbedding
    );
    namesAndSimilarities.push({
      name: otherEmbeddingName,
      similarity: similarityPercent,
    });
  }
  let maxSimilarity = 0;
  let maxName = "";
  for (let i = 0; i < namesAndSimilarities.length; i++) {
    if (namesAndSimilarities[i].similarity > maxSimilarity) {
      maxName = namesAndSimilarities[i].name;
    }
  }
  return maxName;
}

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

  const model = await use.load();
  const embeds = await model.embed(sentences);
  const embeddings = await embeds.arraySync();
  let embeddingsObject = {};
  for (let i = 0; i < embeddings.length; i++) {
    embeddingsObject[sentences[i]] = embeddings[i];
  }
  return embeddingsObject;
}

async function embed1Sentence(inputSentence) {
  /**
   * usage:
   * const embeddingObject = await embed1Sentence('hello there');
   * const embedding = embeddingObject["hello there"];
   */

  if (typeof inputSentence !== "string") return {};

  const sentence = camelCaseToSpaces(inputSentence);

  const model = await use.load();
  const embeds = await model.embed([sentence]);
  const embedding = await embeds.arraySync()[0];
  const embeddingObject = {};
  embeddingObject[sentence] = embedding;
  return embeddingObject;
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

  const model = await use.load();
  const embeddings = await model.embed(sentencePair);
  const embeds = await embeddings.arraySync();
  const similarityPercent = await compareEmbeddings(embeds[0], embeds[1]);
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
      getClosest,
      embedAllSentences,
      embed1Sentence,
      compareSentences,
      compareEmbeddings,
    };
  }
}
