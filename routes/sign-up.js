const express = require("express");
const router = express.Router();
const { setup } = require("../model/mongoose");
const mongoose = require("mongoose");
const bcrypt = require('bcryptjs')

// const passwordInput = document.getElementById('firstPassword')
// const confirmPassword = document.getElementById('confirmPassword')

router.get("/", (req, res) => {
  res.render("sign-up-form");
});

router.post("/", async (req, res, next) => {
  const { password, confirmPassword } = req.body
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10) 
    if (password !== confirmPassword) {
      res.send("Passwords do not match")
    } else {
      console.log(password, confirmPassword)
      setup(mongoose);
      const User = mongoose.model("user");
      const { firstName, lastName, username } = req.body;
      const newUser = new User({
        firstName,
        lastName,
        username,
        password: hashedPassword,
        membershipStatus: "default",
      });
      await newUser.save();
      res.redirect("/");
    }
  } catch (err) {
    res.render('../views/error', {error: err, handler: { url: '/sign-up', link: 'Sign Up' }})
    return next(err);
  }
});

module.exports = router;
