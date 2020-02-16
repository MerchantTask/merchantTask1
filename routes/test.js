const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const Test = require("../models/test");
const bcrypt = require('bcrypt');

router.post("/register", (req, res) => {

  const user = new Test({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password

  });
  user
    .save()
    .then(result => {
      res.status(201).json({
        message_success: "Register Successful"
      });
    })
    .catch(err => {
      res.status(500).send(
       err.errors
             );
    
    });
});



module.exports = router;