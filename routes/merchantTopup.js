const express = require("express");
const router = express.Router();
const Merchant = require("../models/merchantTopup");
const Company = require("../models/companyDetails");

router.post("/addTopup",(req,res)=>{
   
    var date = new Date();
    data = {
          'date': date,
          'topup_amount':req.body.topup_amount,
          'mode_of_payment':req.body.mode_of_payment,
          'remarks':req.body.remarks,
          'company_id':req.body.company_id
    }

    var merchantTopup = new Merchant(data);
    merchantTopup.save().then(function (topup) {
      Company.findByIdAndUpdate(req.body.company_id,{ $inc: { current_balance: req.body.topup_amount} }, {
            new: true
        }).then(function (company) {
            res.send(company);
        }).catch(function (e) {
            res.send(e);
        });
            res.send({
                message: "Succesfull"
            });
        
       
    }); 
});
router.get("/getTopup",function(req,res){
    Merchant.find().then(function(merchant){
        res.send(merchant);
       
    }).catch(function (e) {
        res.send(e);
    })
});




module.exports = router;