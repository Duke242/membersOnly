var express = require('express');
const passport = require('passport');
var router = express.Router();
const bcrypt = require('bcryptjs');
const { setup } = require("../model/mongoose");
const mongoose = require("mongoose");
const LocalStrategy = require("passport-local").Strategy;


setup(mongoose)
const User = mongoose.model('user')

router.get('/', (req, res) => {
  res.render('index')
})

router.post('/', (req, res) => {
 
})

module.exports = router;
