// https://github.com/jimkang/annoy-node
// https://github.com/spotify/annoy

// can't unbuild to add to storage if it's already saved
// https://github.com/spotify/annoy/issues/174#issuecomment-319554923
// https://github.com/spotify/annoy/issues/403#issuecomment-520616560

// have to re-index all to "add" new:
// https://github.com/spotify/annoy/issues/447#issuecomment-574836547

let Annoy;
if (typeof require !== "undefined") {
  Annoy = require("annoy");
}

const DIMENSIONS = 10; // TODO: 512 for embeddings using TensorFlow JS U.S.E.
const STATIC_STORAGE_PATH = "embeddings-data";
const METRIC = "Angular";
const storage = new Annoy(DIMENSIONS, METRIC);

const v1 = [-5.0, -4.5, -3.2, -2.8, -2.1, -1.5, -0.34, 0, 3.7, 6];

init();
read();

function init() {
  storage.addItem(0, v1);
  storage.addItem(1, [5.0, 4.5, 3.2, 2.8, 2.1, 1.5, 0.34, 0, -3.7, -6]);
  storage.addItem(2, [0, 0, 0, 0, 0, -1, -1, -0.2, 0.1, 0.8]);
  storage.build(); // no more items can be added after .build()
  storage.save(STATIC_STORAGE_PATH);
  // can't .unbuild() after .save()
  console.log("number of items in storage", storage.getNItems());
}

function read() {
  if (storage.load(STATIC_STORAGE_PATH)) {
    const kNN = 5;
    // test getting nearest neighbors to v1:
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
