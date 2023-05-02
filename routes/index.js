var express = require('express');
var router = express.Router();
const passport = require('passport')
const mongoose = require('mongoose')
const { setup } = require('../model/mongoose')
/* GET home page. */

router.get('/', async function(req, res, next) {
  setup(mongoose)
  const Message = mongoose.model('message')
  // Populate the `sender` field with the `username` field from the `User` schema
  Message.find({}).populate({
    path: 'sender',
    select: 'username'
  }).then((messages) => {
    console.log(messages)
    res.render('index', { user: req.user , messages });
  }).catch((err) => {
    handleError(err);
  });
});

module.exports = router;
