# code-explorer

3 CLI tabs:

## Run database

```bash
mongod --dbpath=data
```

## Run server

```bash
node index.js
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
