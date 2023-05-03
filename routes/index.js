var express = require('express');
var router = express.Router();
const passport = require('passport')
const mongoose = require('mongoose')
const { setup } = require('../model/mongoose')
/* GET home page. */

router.get('/', async function(req, res, next) {
  setup(mongoose)
  const Message = mongoose.model('message')
  console.log(req.user)
  // Populate the `sender` field with the `username` field from the `User` schema
  Message.find({}).populate({
    path: 'sender',
    select: 'username'
  }).then((messages) => {
    // console.log(messages)
    res.render('index', { user: req.user , messages });
  }).catch((err) => {
    handleError(err);
  });
});

router.delete('/:id', async function(req, res, next) {  
  try {
    console.log('delete request received')  
    setup(mongoose)  
    const Message = mongoose.model('message')  
    await Message.findByIdAndRemove(req.params.id)  
    res.redirect('/')
  } catch (err) {
    next(err)
  }
});

module.exports = router;
