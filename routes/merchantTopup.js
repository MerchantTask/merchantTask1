const express = require("express");
const router = express.Router();
const Merchant = require("../models/merchantTopup");

router.post("/addTopup",(req,res)=>{
    var date = new Date();
    data = {
          'date': date,
          'topup_amount':req.body.topup_amount,
          'mode_of_payment':req.body.mode_of_payment,
          'remarks':req.body.remarks,
          'company_name':req.body.company_name
    }

    var merchantTopup = new Merchant(data);
    merchantTopup.save().then(function () {
        res.send({
            message: "Succesfull"
        })
    }); 
});
module.exports = router;