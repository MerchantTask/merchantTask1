const express = require("express");
const router = express.Router();
const UserModel = require("../models/userRegister");
const auth = require("../middleware/auth");
const bcrypt = require("bcrypt");

router.post("/userRegister",(req,res)=>{
   const saltRounds = 10;
    var password = req.body.password;
    bcrypt.genSalt(saltRounds,function(err,salt){
        if(err){
            throw err
        }else{
            bcrypt.hash(password,salt,function(err, hashPassword){
                if(err){
                    throw err
                }else{
                    data = {
                        "full_name": req.body.full_name,
                        "phone"    : req.body.phone,
                        "address"  : req.body.address,
                        "email"    : req.body.email,
                        "password" : hashPassword
                    }
                    var addUser = new UserModel(data);
                    addUser
                    .save()
                    .then(function(){
                        res.status(201).json({
                            message: "Register Sucessful"
                        })
                    }).catch(err=>{
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

router.post("/userLogin", async function(req,res){
    if (req.body.email == ""){
        res.json({
            message:"Email address is empty"
        });
        
    }else if(req.body.password == ""){
        res.json({
            message: "password is empty "
        });

    }else{
        try{
            const user = await UserModel.checkCrediantialsDb(req.body.email,req.body.password);
            if(user){
                const user_token = await user.generateAuthToken();
                var user_id = user._id;
                var user_email = user.email;
                res.send({
                    user_token,
                    user_id,
                    user_email,
                    message:"login Sucessful"
                });
                console.log(user_id);
            }else{
                res.json({
                    message: "please enter valid user"
                });
            }
        }catch(e){
            console.log(e);
        }
    }
});
module.exports = router;