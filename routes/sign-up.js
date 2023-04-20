const express = require('express')
const router = express.Router()
const { setup } = require('../model/mongoose')
const mongoose = require('mongoose')

router.get("/", (req, res) => {
  res.render('sign-up-form')
})

router.post("/", async (req, res) => {
  setup(mongoose)
  const User = mongoose.model('user')
  const { firstName, lastName, username, password } = req.body
  const newUser = new User({ firstName, lastName, username, password, membershipStatus: "default" })
  await newUser.save()
  res.json("user created")

})






module.exports = router 