"""
pip install --user annoy
or
pip3 install --user annoy
"""

# compared to use-ann.js, this could have better perf
# because it can unbuild to add data, which the .js can't

# TODO: https://github.com/spotify/annoy/issues/174
# https://github.com/spotify/annoy/pull/178/files

import random
from annoy import AnnoyIndex

DIMENSIONS = 10  # TODO: 512 for embeddings using TensorFlow JS U.S.E.
STATIC_STORAGE_PATH = "embeddings-data"
METRIC = "angular"
storage = AnnoyIndex(DIMENSIONS, METRIC)


def read():
    if (storage.load(STATIC_STORAGE_PATH)):
        kNN = 5
        (neighbors, distances) = storage.get_nns_by_vector(v1, kNN, -1, True)
        # true = include distances
        # print(neighbors) # indices of K nearest neighbors
        print(distances)
        index = neighbors[0]
        vectorOfNearestNeighbor = storage.get_item_vector(index)
        print(vectorOfNearestNeighbor)


v1 = [-5.0, -4.5, -3.2, -2.8, -2.1, -1.5, -0.34, 0, 3.7, 6]
storage.add_item(0, v1)
storage.add_item(1, [5.0, 4.5, 3.2, 2.8, 2.1, 1.5, 0.34, 0, -3.7, -6])
storage.add_item(2, [0, 0, 0, 0, 0, -1, -1, -0.2, 0.1, 0.8])
storage.build(1)  # 1 tree
storage.save(STATIC_STORAGE_PATH)
print("number of items in storage", storage.get_n_items())

read()
