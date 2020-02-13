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
            res.send({
                message: "Succesfull"
            });
        }).catch(function (e) {
            res.send(e);
        });
           
        
       
    }); 
});
router.get("/getTopup",function(req,res){
       Merchant.find()
    .populate('company_id')
    .exec()
    .then(function (merchant) {

        if (merchant) {
            res.json({
                merchants: merchant.map(doc => {
                    return {
                        _id: doc._id,
                        topup_amount: doc.topup_amount,
                        mode_of_payment: doc.mode_of_payment,
                        date: doc.date,
                        remarks: doc.remarks,
                        company_id: doc.company_id
                        
                    };
                  
                })
            })

        }

    })

});

// get Topup by id
router.get("/getTopupbyid/:company_id",function(req,res){
    var companyId = req.params.company_id.toString();
    console.log(companyId);
        Merchant.find({
            company_id: companyId
        }).then(function (topup) {
            res.send(topup);
        }).catch(function (e) {
            res.send(e);
        });

});


module.exports = router;