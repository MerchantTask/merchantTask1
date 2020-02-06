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

  router.get('/getDetails/:id', function (req, res) {
    var adminId = req.params.id.toString();

    Admin.find({
        _id: adminId
    }).then(function (detail) {

         res.send(detail[0].password);

    }).catch(function (e) {
        res.send(e);
    });
  });

router.post("/changePassword/:id", function(req, res) {

  if(req.body.oldPassword!==req.body.currentPassword){
    res.json({
      message: "Old Password didn't Match"
  });
  }
  else{
    adminId = req.params.id.toString();

    Admin.findByIdAndUpdate(adminId, req.body, {
        new: true
    }).then(function (result) {
      res.json({
        message: "Password Changed"
    });
    }).catch(function (e) {
        res.send(e);
    });
  }
});

  module.exports = router;