# code-explorer

3 CLI tabs:

## Run database

```bash
mongod --dbpath=data
```

## Run server

```bash
node server.js
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

## Todo

### Housekeeping

- modularize (e.g. useDb(), useTensorFlow(), ... - could rename better)
- make sure generic so can use in other projects

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
