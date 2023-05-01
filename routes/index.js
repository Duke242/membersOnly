var express = require('express');
var router = express.Router();
const passport = require('passport')
const mongoose = require('mongoose')
const { setup } = require('../model/mongoose')
/* GET home page. */

router.get('/', async function(req, res, next) {
  setup(mongoose)
  const Message = mongoose.model('message')
  const messages = await Message.find({})
  res.render('index', { user: req.user , messages, mongoose, setup });
});

module.exports = router;
