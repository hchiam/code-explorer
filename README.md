# Code Explorer

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

3 CLI tabs:

## Run database

```bash
mongod --dbpath=data
```

## Run server

```bash
node server.js
```

## See dependency graph

```bash
depcruise --exclude "^node_modules" --output-type dot . | dot -T svg > dependencygraph.svg; open -a "Firefox" dependencygraph.svg;
```

## Debug database

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

### Steps

1. get goal
2. get embeddings of props/actions
3. get embeddings so it can get ideas of combos to try:
   - get embeddings of docs sentences that are associated with API props/actions
   - get code examples from docs API to generate example inputs
   - get embeddings of any error logs (compare to props/actions/docs embeddings)
   - get embeddings of any google suggestion sentence (compare to props/actions/docs embeddings)
4. check if any action combos get the goal result already (key: result, value: action combo)
5. choose closest embeddings to goal or error log:
   - check nearness of embeddings of single actions (try shallow API first)
   - check nearness of embeddings of combos suggested by docs/google/error logs
6. get different ways to make combos:
   - sequence functions (doSomething(); doSomethingElseAfter();)
   - within/chained functions, conceptually includes "=" (doSomethingAfter(doSomethingFirst()))
7. try combos/single actions:
   - with delay between things tried
   - in either codepen or new sandboxed browser instances (for safety and to isolate variables)
8. get and store results and results frequencies for what tried:
   - how use this to check if achieved goal?
9. report findings from results of actions tried

#### Stepping back

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
