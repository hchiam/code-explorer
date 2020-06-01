// https://github.com/jimkang/annoy-node
// https://github.com/spotify/annoy

let Annoy;
if (typeof require !== "undefined") {
  Annoy = require("annoy");
}

const DIMENSIONS = 10; // TODO: 512 for embeddings using TensorFlow JS U.S.E.
const STATIC_STORAGE_PATH = "embeddings-data";
const METRIC = "Angular";
const storage = new Annoy(DIMENSIONS, METRIC);

const v1 = [-5.0, -4.5, -3.2, -2.8, -2.1, -1.5, -0.34, 0, 3.7, 6];
storage.addItem(0, v1);
storage.addItem(1, [5.0, 4.5, 3.2, 2.8, 2.1, 1.5, 0.34, 0, -3.7, -6]);
storage.addItem(2, [0, 0, 0, 0, 0, -1, -1, -0.2, 0.1, 0.8]);
storage.build(); // no more items can be added after .build()
storage.save(STATIC_STORAGE_PATH);
console.log("number of items in storage", storage.getNItems());

read();

function read() {
  if (storage.load(STATIC_STORAGE_PATH)) {
    const kNN = 5;
    const { neighbors, distances } = storage.getNNsByVector(v1, kNN, -1, true); // true = include distances
    // console.log(neighbors); // indices of K nearest neighbors
    console.log(distances);
    const index = neighbors[0];
    const vectorOfNearestNeighbor = storage.getItem(index);
    console.log(vectorOfNearestNeighbor);
  }
}

if (typeof exports !== "undefined") {
  if (typeof module !== "undefined" && module.exports) {
    // module.exports = { runShellCommand, sendShellCommand };
  }
}
