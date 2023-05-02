const express = require('express')
const { setup } = require('../model/mongoose')
const mongoose = require('mongoose')
const router = express.Router()

router.post('/new', async (req, res) => {
  const { content, title } = req.body
  const timeStamp = new Date()
  console.log(req.session)
  const { user } = req
  setup(mongoose)
  const Message = mongoose.model('message')
  const message = new Message({
    sender: user._id,
    title,
    text: content,
    timeStamp,
  })
  await message.save()
  res.redirect('/')
})

module.exports = router