const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const Admin = require("../models/admin");

router.post("/register", (req, res) => {
   
          const user = new Admin({
            username: req.body.username,
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
        res.status(500).json({
          message: err
        });
      });
  });


//route for user login
router.post("/", async function(req, res) {
        if (req.body.username == "") {
            res.json({
                message: "Username is empty"
            });
        } else if (req.body.password == "") {
            res.json({
                message: "password is empty"
            });
        } 
        else {
            try {
                const user = await Admin.checkCrediantialsDb(req.body.username, req.body.password);
                              if (user) {
                    const token = await user.generateAuthToken();
                    
                    res.send({
                        token
                       
                    });
    
                } else {
                    res.json({
                        message: "User not found"
                    });
                }
            } catch (e) {
                console.log(e);
            }
        }
    

  });
  module.exports = router;