var express = require('express');
const passport = require('passport');
var router = express.Router();
const bcrypt = require('bcryptjs');
const { setup } = require("../model/mongoose");
const mongoose = require("mongoose");
const LocalStrategy = require("passport-local").Strategy;
const initialize = require("../validators/passportConfig.js");

initialize(passport);

setup(mongoose)
const User = mongoose.model('user')

router.get('/', (req, res) => {
  res.render('index')
})

// /From passport see passportConfig for local strategy. TODO add option for OAUth?/
router.post('/', passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/log-in",
    // failureFlash: "Invalid username or password"
  }),
  );
module.exports = router;
