const express = require ("express");
const router = express.Router();
const merchant =  require("../models/companyDetails");

router.post("/login", async function (req,res){
    if (req.body.company_email == ""){
        res.json({
            message: "Email is empty"
        });
        
    }
    else if(req.body.password == ""){
        res.json({
            message:"password is empty"
        });
    } else {
        try{
             const user = await merchant.checkCrediantialsDb(req.body.company_email,req.body.password);
            if (user){
                var id = user._id;
                res.send({
                    id
                    
                });
                console.log(id);
                console.log("login Sucessful");

            }else{
                res.json({
                    message:"user not found"
                });
            }
        }catch (e){
            console.log(e);
        }
    }
});
module.exports = router;