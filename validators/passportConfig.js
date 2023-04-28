const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require('bcryptjs');
const { setup } = require('../model/mongoose')
const mongoose = require('mongoose')

    // passport.use(
    //   new LocalStrategy(async(username, password, done) => {
    //     try {
    //       const user = await User.findOne({ username: username });
    //       if (!user) {
    //         return done(null, false, { message: "Incorrect username" });
    //       };
    //       bcrypt.compare(password, user.password, (err, res) => {
    //         if (res) {
    //           // passwords match! log user in
    //           return done(null, user)
    //         } else {
    //           // passwords do not match!
    //           return done(null, false, { message: "Incorrect password" })
    //         }
    //       });
    //       return done(null, user);
    //     } catch(err) {
    //       return done(err);
    //     };
    //   })
    // );

    
setup(mongoose)
const User = mongoose.model('user')

  function initialize(passport) {
    console.log("In initialize.")
    // const authenticateUser = (email, password, done) => {
      passport.use(new LocalStrategy(async(username, password, done) => {
          try {
            const user = await User.findOne({ username });
            console.log({user})
            if (!user) {
              return done(null, false, { message: "Incorrect username" });
            };
            const res = await bcrypt.compare(password, user.password)
            console.log({res})
            if (res) {
              // passwords match! log user in
              console.log('password match')
              return done(null, user)
            } 
            // passwords do not match!
            console.log('passwords do not match')
            return done(null, false, { message: "Incorrect password" })
            
          } catch(err) {
            return done(err);
          };
        }))
   
    // passport.use(
    //   new LocalStrategy(
    //     { usernameField: "email", 
    //       passwordField: "password" },
    //     authenticateUser
    //   )
    // );
    passport.serializeUser(function(user, done) {
      console.log("in serialize user.", user.id)
      done(null, user.id);
    });
  
    passport.deserializeUser(async function(id, done) {
      try {
        const user = await User.findById(id);
             // This configures sessions object 
        const userSession = {
          firstName: user.firstName,
          lastName: user.lastName,
          userId: user.id,
        }
        console.log(`This is userSession: ${userSession}`)
        done(null, user);
      } catch(err) {
        done(err);
      };
    });
     
  
      // return done(null, userSession);
      }
  
    
  module.exports = initialize