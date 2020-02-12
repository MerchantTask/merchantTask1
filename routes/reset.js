const express = require("express");
const router = express.Router();
const Admin = require("../models/admin");
var nodemailer = require('nodemailer');
var crypto = require('crypto');
const bcrypt = require('bcrypt');

router.post('/reset-password', function (req, res) {
    const email = req.body.email;

    var transport = nodemailer.createTransport({
        host: "smtp.mailtrap.io",
        port: 2525,
        auth: {
          user: "95fa5dad731929",
          pass: "6c073eaa6d70ab"
        }
      });

      

    Admin
        .findOne({
            email: email//checking if the email address sent by client is present in the db(valid)
        })
        .then(function (admin) {
            if (!admin) {
                res.send({message:"No account with that email address exists."}); 
            }
            else{
                crypto.randomBytes(20, function(err, buffer) {
                    var token = buffer.toString('hex');
                    
                
                  var mailOptions = {
                    from: 'noreply@xcelservices.com',
                    to: email,
                    subject: 'Password Reset',
                    text: 'Your token is '+token 
                    // + 'and your link is http://localhost:8000/reset/resettoken/' + token
                  };

                
                transport.sendMail(mailOptions, function(error, info){
                    if (error) {
                      console.log(error);
                    } else {
                      console.log('Email sent: ' + info.response);
                      
                    }
                  });

                
                

                  Admin.findByIdAndUpdate({ _id: admin._id }, { reset_password_token: token,
                     reset_password_expires: Date.now() + 86400000 },
                      { upsert: true, new: true }).exec().then(function (user) {
                        res.send({
                           message:"token sent"
                          });
                    });;

               

                });
            }
          
        })
 })


 router.post('/reset_token/', function (req, res) {
  var token = req.body.token;
  Admin.find({
      reset_password_token: token,
      reset_password_expires: {
          $gt: Date.now()
        } 
  }).then(function (admin) {
    if(admin==""){
      res.json({
        message:"your token has expired"
      });
    }
    else{
      res.json({
        id:admin[0]._id
        
      }
        
      );
    }
    
  }).catch(function (e) {
      res.send(e);
  });

});



//  router.get('/resettoken/:token', function (req, res) {
//     var token = req.params.token.toString();
// console.log(token);
//     Admin.find({
//         reset_password_token: token,
//         reset_password_expires: {
//             $gt: Date.now()
//           } 
//     }).then(function (admin) {
//       if(admin==""){
//         res.json({
//           message:"your token has expired"
//         });
//       }
//       else{
//         res.send(
//           admin
//         );
//       }
      
//     }).catch(function (e) {
//         res.send(e);
//     });

// });

router.put('/updatenewpassword/:id', function (req, res) {
  adminId = req.params.id.toString();
  const saltRounds = 10;

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


    
    
  })

module.exports = router;