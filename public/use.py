# https://github.com/jimkang/annoy-node
# https://github.com/spotify/annoy

"""
pip install --user annoy
or
pip3 install --user annoy
"""

import random
from annoy import AnnoyIndex

DIMENSIONS = 10  # TODO: 512 for embeddings using TensorFlow JS U.S.E.
STATIC_STORAGE_PATH = "embeddings-data"
METRIC = "angular"
storage = AnnoyIndex(DIMENSIONS, METRIC)

v1 = [-5.0, -4.5, -3.2, -2.8, -2.1, -1.5, -0.34, 0, 3.7, 6]


def load_existing_storage():
    storage.load(STATIC_STORAGE_PATH)
    # storage.unbuild()  # this won't work
    # can't unbuild to add to storage if it's already saved
    # https://github.com/spotify/annoy/issues/174#issuecomment-319554923
    # https://github.com/spotify/annoy/issues/403#issuecomment-520616560

    # have to re-index all to "add" new:
    # https://github.com/spotify/annoy/issues/447#issuecomment-574836547


def init():
    storage.add_item(0, v1)
    storage.add_item(1, [5.0, 4.5, 3.2, 2.8, 2.1, 1.5, 0.34, 0, -3.7, -6])
    storage.add_item(2, [0, 0, 0, 0, 0, -1, -1, -0.2, 0.1, 0.8])
    storage.build(1)  # 1 tree
    # no more items can be added after .build()
    storage.save(STATIC_STORAGE_PATH)
    # can't .unbuild() after .save()
    print("number of items in storage", storage.get_n_items())


def read():
    if (storage and storage.load(STATIC_STORAGE_PATH)):
        kNN = 5
        # test getting nearest neighbors to v1:
        (neighbors, distances) = storage.get_nns_by_vector(v1, kNN, -1, True)
        # true = include distances
        # print(neighbors) # indices of K nearest neighbors
        print(distances)
        index = neighbors[0]
        vectorOfNearestNeighbor = storage.get_item_vector(index)
        print(vectorOfNearestNeighbor)


init()
read()
