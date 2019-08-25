const router = require('express').Router();
let User = require('../models/user.model'); // mongoose model for the user

// Authentification
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");

require('../../config/passport');

// Load input validation
const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");

// @route POST api/users/register
// @desc Register user
// @access Public
router.post("/register", (req, res) => {
    // Form validation
    const { errors, isValid } = validateRegisterInput(req.body);
    
    // Check validation
    if (!isValid) {
      return res.status(400).json(errors);
    }User.findOne({ username: req.body.emailusername }).then(user => {
      if (user) {
        return res.status(400).json({ username: "Username already exists" });
      } else {
        const newUser = new User({
          username: req.body.username,
          //email: req.body.email,
          password: req.body.password
        });// Hash password before saving in database
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser
              .save()
              .then(user => res.json(user))
              .catch(err => console.log(err));
          });
        });
      }
    });
  });

// @route POST api/users/login
// @desc Login user and return JWT token
// @access Public
router.post("/login", (req, res) => {
    // Form validation
    const { errors, isValid } = validateLoginInput(req.body);
    
    // Check validation
    if (!isValid) {
      return res.status(400).json(errors);
    }const username = req.body.username;
    const password = req.body.password;// Find user by email
    User.findOne({ username }).then(user => {
      // Check if user exists
      if (!user) {
        return res.status(404).json({ usernamenotfound: "Username not found" });
      }// Check password
      bcrypt.compare(password, user.password).then(isMatch => {
        if (isMatch) {
          // User matched
          // Create JWT Payload
          const payload = {
            id: user.id,
            username: user.username
          };// Sign token
          jwt.sign(
            payload,
            keys.secretOrKey,
            {
              expiresIn: 31556926 // 1 year in seconds
            },
            (err, token) => {
              res.json({
                success: true,
                token: "Bearer " + token
              });
            }
          );
        } else {
          return res
            .status(400)
            .json({ passwordincorrect: "Password incorrect" });
        }
      });
    });
  });


// First route for localhost:5000/users/
router.route('/').get((req, res) => {
    User.find() // method to get a list for all the users from the db
    .then(users => res.json(users)) // return on json format
    .catch(err => res.status(400).json('Error: ' + err));
});

// Second route localhost:5000/users/add (post request)
router.route('/add').post((req, res) => {
    const username = req.body.username;
    
    const newUser = new User({username});

    newUser.save()
    .then(() => res.json('User added!'))
    .catch(err => res.status(400).json('Error: ' + err));
    
});

module.exports = router;