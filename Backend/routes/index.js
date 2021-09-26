var express = require('express');
var router = express.Router();
const Chat = require('../models/Chat')

/* GET home page. */
router.get('/', function (req, res, next) {
  Chat.find().then((data) => {
    res.json(data)
  }).catch(err => {
    res.status(500).json(err);
  })
});

router.post('/', function (req, res, next) {
  Chat.create(req.body).then((data) => {
    res.json(data)
  }).catch(err => {
    res.status(500).json(err);
  })
});

router.delete('/:id', function (req, res, next) {
  Chat.findOneAndDelete({ _id: req.params.id }).then((data) => {
    res.json(data)
  }).catch(err => {
    res.status(500).json(err);
  })
});

router.put('/:id', function (req, res, next) {
  Chat.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true }).then((data) => {
    res.json(data)
  }).catch(err => {
    res.status(500).json(err);
  })
});

module.exports = router;
