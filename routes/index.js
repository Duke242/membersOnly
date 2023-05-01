var express = require('express');
var router = express.Router();
const passport = require('passport')
const mongoose = require('mongoose')
const { setup } = require('../model/mongoose')
/* GET home page. */

router.get('/', async function(req, res, next) {
  setup(mongoose)
  const Message = mongoose.model('message')
  const User= mongoose.model('user')
  const messages = await Message.find({})
  const messagesWithSenderName = messages.map((msg) => {
    const user = await User.find({_id: req.user})
    const username = user.username;
    msg['senderName'] = username;
    return msg
  };
  res.render('index', { messagesWithSenderName });
});

module.exports = router;
