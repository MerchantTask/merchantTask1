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


router.put("/changePassword/:id", function (req, res) {
  var adminId = req.params.id.toString();
  var oldPassword = "";

  Admin.find({
    _id: adminId
  }).then(function (detail) {

    oldPassword = detail[0].password;
  
    if (oldPassword !== req.body.currentPassword) {
      res.json({
        message: "Old Password didn't Match"
      });
    } 
    else if(oldPassword == req.body.password){
      res.json({
        message: "You used same old password. Please use different password"
      });
    }
    else {

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

  }).catch(function (e) {
    res.send(e);
  });

});

router.get('/logout', auth, async (req, res) => {
  try {
      req.user.token = req.user.token.filter((token) =>{
       return token.token !== req.token 
      })
      await req.user.save()
      res.send()
  } catch (error) {
      res.status(500).send()
  }
})

module.exports = router;