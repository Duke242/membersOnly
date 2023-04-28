var express = require('express');
var router = express.Router();
const passport = require('passport')
const mongoose = require('mongoose')
const { setup } = require('../model/mongoose')
/* GET home page. */

router.get('/', async function(req, res, next) {
  setup(mongoose)
  const Message = mongoose.model('message')
  const messages = Message.find({})
  console.log({messages})
  res.render('index', { user: req.user , messages });
});

module.exports = router;
