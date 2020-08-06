# Code Explorer [![version](https://img.shields.io/github/release/hchiam/code-explorer)](https://github.com/hchiam/code-explorer/releases) [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://github.com/hchiam/code-explorer/blob/master/LICENSE)

Kinda like JARVIS, but just for coding.

## Setup

`yarn` to install dependencies.

The you can run 3 CLI tabs: (or just do `yarn start` - don't forget to do `yarn stop` when you're done)

### Run database

```bash
mongod --dbpath=data
```

### Run server

```bash
node server.js
```

### Debug database

```bash
# https://www.tutorialspoint.com/mongodb/mongodb_query_document.htm
mongo
use takeaways
db.takeaways.insert({'some-key':'some-data'})
db.takeaways.insert({'some-key':'some-other-data'})
db.takeaways.find({'some-key':'some-data'})
db.takeaways.find()
db.takeaways.update({'some-key':'some-other-data'},{$set:{'some-key':'new data'}})
db.takeaways.find()
db.takeaways.remove({'some-key':'new data'})
db.takeaways.remove({'some-key':{$regex:/some-data/}})
db.takeaways.find()
```

## See dependency graph

```bash
deps
# for example:
# Enter max depth:
# Enter src folder (or folder or file you'd like to inspect): public/index.js
```

## Steps

For now, most critical are 1, 2, 5, 8, 11: (goal, nearest, ask, report/show)

1. get goal
2. get embeddings of props/actions
   - store these embeddings for faster access later if repeated
   - (use ANNOY to get stored index and recreate index with updated data)
3. BONUS: get embeddings so it can get ideas of combos to try:
   - get embeddings of docs sentences that are associated with API props/actions
   - get code examples from docs API to generate example inputs
   - get embeddings of any error logs (compare to props/actions/docs embeddings)
   - get embeddings of any google suggestion sentence (compare to props/actions/docs embeddings)
4. BONUS: check if any action combos get the goal result already (key: result, value: action combo)
5. choose closest embeddings to goal
   - check nearness of embeddings of single actions (try shallow API first)
6. BONUS: choose closest embeddings to error log:
   - check nearness of embeddings of single actions (try shallow API first)
   - check nearness of embeddings of combos suggested by docs/google/error logs
7. BONUS: get different ways to make combos:
   - sequence functions (doSomething(); doSomethingElseAfter();)
   - within/chained functions, conceptually includes "=" (doSomethingAfter(doSomethingFirst()))
8. ask/suggest before trying (for security)
9. BONUS: try combos/single actions:
   - with delay between things tried
   - in either codepen or new sandboxed browser instances (for safety and to isolate variables)
10. BONUS: get and store results and results frequencies for what tried:
    - how use this to check if achieved goal?
11. report/show findings from results of actions tried (variable value + UI, which may be in a CodePen if possible)

### Stepping back

This process is different from semantic code search because it also proactively checks error logs, tries combinations, and checks results (at least tries to, in a sandbox).

## Other notes

### ResponsiveVoice

<div><a href="https://responsivevoice.org">ResponsiveVoice-NonCommercial</a> licensed under <a href="https://creativecommons.org/licenses/by-nc-nd/4.0/"><img title="ResponsiveVoice Text To Speech" src="https://responsivevoice.org/wp-content/uploads/2014/08/95x15.png" alt="95x15" width="95" height="15" /></a></div>

### TensorFlow.js Universal Sentence Encoder lite

<https://github.com/tensorflow/tfjs-models/tree/master/universal-sentence-encoder>

<https://github.com/hchiam/text-similarity-test>

### ANNOY Node bindings

For an efficient Approximate Nearest Neighbors search of nearest embeddings (instead of checking every single embedding stored in memory every time):

<https://github.com/spotify/annoy>

<https://github.com/jimkang/annoy-node>

```bash
# for python:
pip install --user annoy
```
