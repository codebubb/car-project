var express = require('express');
var router = express.Router();
const ObjectID = require('mongodb').ObjectID;

router.get('/filters', (req, res, next) => {
  const fields = ['make', 'model', 'year'];
  const dbRequests = fields.map(field => 
    req.collection
      .distinct(field)
      .then(data => ({ field, data: data.sort() }))
    );
  
  Promise.all(dbRequests)
    .then(results => {
      const reducedResults = results.reduce((acc, {field, data}) => ({ ...acc, [field]: data }), {})
      res.json(reducedResults);
    })
    .catch(err => res.send(err));
});


router.get('/cars', (req, res, next) => {
  req.collection.find({})
    .toArray()
    .then(results => res.json(results))
    .catch(err => res.send(err));
});

router.get('/filter/:type/:value', (req, res, next) => {
  const { type, value } = req.params; 
  req.collection.find({ [type]: value })
    .toArray()
    .then(results => res.json(results))
    .catch(err => res.send(err));
});

router.get('/cars/:id', (req, res, next) => {
  const _id = ObjectID(req.params.id);
  req.collection.findOne({ _id })
    .then(results => res.json(results))
    .catch(err => res.send(err));
});


module.exports = router;
