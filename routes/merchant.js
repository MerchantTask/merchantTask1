const express = require("express");
const router = express.Router();
const Company = require("../models/merchantDetails");
const auth = require("../middleware/auth");
const multer = require('multer');
const path = require('path');
var nodemailer = require('nodemailer');
var generator = require('generate-password');
const bcrypt = require('bcrypt');
const uuidAPIKey = require('uuid-apikey');


//uploads image
var storage = multer.diskStorage({
    destination: './public/uploads',
    filename: (req, file, callback) => {
        let ext = path.extname(file.originalname);
        callback(null, file.fieldname + '-' + Date.now() + ext);
    }
});

//validations
var imageFileFilter = (req, file, cb) => {
    if (!file.originalname.match(/\.(jpg|jpeg|png|PNG|gif)$/)) {
        return cb(new Error("You can upload only image files!"), false);
    }
    cb(null, true);
};

var upload = multer({
    storage: storage,
    fileFilter: imageFileFilter,
    limits: {
        fileSize: 1000000
    }
});

//uploads image
router.post('/upload', upload.single('imageFile'), (req, res) => {
    res.json(req.file);
});





router.post("/addCompany",auth,(req,res)=>{
    var password = generator.generate({
        length: 10,
        numbers: true
    });
   
    var apikey = uuidAPIKey.create();
    console.log(apikey)
    const saltRounds = 10;

    bcrypt.genSalt(saltRounds, function (err, salt) {
        if (err) {
          throw err
        } else {
          bcrypt.hash(password, salt, function(err, hashedPassword) {
            if (err) {
              throw err
            } else {
                var transport = nodemailer.createTransport({
                    host: "smtp.mailtrap.io",
                    port: 2525,
                    auth: {
                      user: "95fa5dad731929",
                      pass: "6c073eaa6d70ab"
                    }
                  });

                  var mailOptions = {
                    from: 'noreply@xcelservices.com',
                    to: req.body.company_email,
                    subject: 'One time password',
                    text: 'Dear Merchant, your one time password is '+ password
                  };

                  transport.sendMail(mailOptions, function(error, info){
                    if (error) {
                      console.log(error);
                    } else {
                      console.log('Email sent: ' + info.response);
                    }
                  });

                  data = {
                    'company_name': req.body.company_name,
                    "address": req.body.address,
                    "contact_person": req.body.contact_person,
                    "contact_email": req.body.contact_email,
                    "contact_phone": req.body.contact_phone,
                    "company_email": req.body.company_email,
                    "pan": req.body.pan,
                    "verification_imagename": req.body.verification_imagename,
                    "password":hashedPassword,
                    "apikey":apikey.apiKey
                }
            
                var addCompany = new Company(data);
                addCompany
                .save()
                .then(function () {
                  res.status(201).json({
                    message_success: "Register Successful"
                  
                  })                
                    }).catch(err => {
                      console.log(err);
                      res.status(500).send(
                       err.errors
                     );
                }); 
        
                
            }
          })
        }
      })

});

router.post("/login", async function (req, res) {
    if (req.body.company_name == "") {
      res.json({
        message: "company_name is empty"
      });
    } else if (req.body.password == "") {
      res.json({
        message: "password is empty"
      });
    } else {
      try {
        const user = await Company.checkCrediantialsDb(req.body.company_name, req.body.password);
        if (user) {
          const token = await user.generateAuthToken();
  var id= user._id;
  var loginattempt= user.loginattempt;

          res.send({
            token,
            id,
            loginattempt
  
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

router.get('/allCompanies', function (req, res) {
    Company.find().then(function (companies) {
        res.send(companies);
    }).catch(function (e) {
        res.send(e);
    });
});

router.get('/fetchSingleCompany/:id', function (req, res) {
    var companyId = req.params.id.toString();
console.log(companyId);
    Company.find({
        _id: companyId
    }).then(function (company) {
        res.send(company);
    }).catch(function (e) {
        res.send(e);
    });

});

router.put('/updateCompany/:id',auth, function (req, res) {
    CompanyId = req.params.id.toString();

    Company.findByIdAndUpdate(CompanyId, req.body, {
        new: true
    }).then(function (company) {
        res.send(company);
    }).catch(function (e) {
        res.send(e);
    });
});
router.delete('/deleteCompany/:id', auth,function (req, res) {
    Company.findByIdAndDelete(req.params.id).then(function (company) {
        res.json({
            message: "Deleted Successfully"
        })
    }).catch(function (e) {
        res.send(e);
    });
});

router.get('/merchantCount', function (req, res) {
     Company.find().count(function (err, count) {
        res.json({
            count
        });
    });
});

router.get('/merchantList', function (req, res) {
    Company.find().then(function (Merchantlist) {
       res.json(
           Merchantlist
       );
   });
});


router.put("/merchantChangePassword/:id", function (req, res) {
    var merchantId = req.params.id.toString();
      const saltRounds = 10;
      var currentPassword = req.body.currentPassword;
     
      var oldPassword;
  if(req.body.password==currentPassword){
    res.json({
      message: "You used same password"
    });
  }
  else{
      Company.find({
          _id: merchantId
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
                              Company.findByIdAndUpdate({_id:merchantId}, {$set:{password:hash,loginattempt:1}}, {
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


module.exports = router;
