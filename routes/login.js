const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const Admin = require("../models/admin");
const bcrypt = require('bcrypt');
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
router.post("/", async function (req, res) {
  if (req.body.username == "") {
    res.json({
      message: "Username is empty"
    });
  } else if (req.body.password == "") {
    res.json({
      message: "password is empty"
    });
  } else {
    try {
      const user = await Admin.checkCrediantialsDb(req.body.username, req.body.password);
      if (user) {
        const token = await user.generateAuthToken();
var id= user._id;
        res.send({
          token,
          id

        });
        console.log(id);
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
router.get('/users/me', auth, async(req, res) => {
  // View logged in user profile
  res.send(req.user);
})

router.put("/changePassword/:id", function (req, res) {
  var adminId = req.params.id.toString();
    const saltRounds = 10;
    var currentPassword = req.body.currentPassword;
   
    var oldPassword;
if(req.body.password==currentPassword){
  res.json({
    message: "You used same password"
  });
}
else{
    Admin.find({
        _id: adminId
      }).then(function (detail) {
    
        oldPassword = detail[0].password; //old hashed password
  
        bcrypt.compare(currentPassword, oldPassword, function (err, isMatch) {
            if (err) {
                throw err
            } else if (!isMatch) {
                res.json({
                    message: "Old Password Doesn't Match"
                  });
            } else {

                bcrypt.genSalt(saltRounds, function (err, salt) {
                    if (err) {
                      throw err
                    } else {
                      bcrypt.hash(req.body.password, salt, function(err, hash) {
                        if (err) {
                          throw err
                        } else {
                            Admin.findByIdAndUpdate({_id:adminId}, {$set:{password:hash}}, {
                                new: true
                              }).then(function (result) {
                                res.json({
                                  message: "Password Changed"
                                });
                              }).catch(function (e) {
                                res.send(e);
                              });   
                        }
                      })
                    }
                  })


              
            }
        })

     
    })
  }
 
});

router.post('/users/me/logout', auth, async (req, res) => {
  try {
    req.user.tokens = [];
    await req.user.save();
    res.status("201").json({
      message: "logged out"
    });
  } catch (e) {
    res.status(500).send();
  }
})
module.exports = router;