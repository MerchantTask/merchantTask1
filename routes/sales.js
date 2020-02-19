const express = require("express");
const router = express.Router();
const Sales = require("../models/sales");
const Company = require("../models/companyDetails");

router.post("/Addtocart",(req,res)=>{
    data={
        "product_name": req.body.product_name,
        "quantity" :req.body.quantity,
        "details"  : req.body.details,
        "price"    :req.body.price,
        "image"    : req.body.image,
        "remarks"  :req.body.remarks,
        "company_id"  :req.body.company_id
    }
    const productAdd = new Sales(data);
    productAdd.save().then(function(){
        Company.findByIdAndUpdate(req.body.company_id,{
            new: true
        }).then(function (data) {
            res.send({
                message: "Succesfull"
            });
        }) .catch(function (e) {
            res.send(e);
        });
           
        
       
    }).catch(err => {
        res.status(500).send(
         err.errors
               );
      
      });
});
router.get("/getAddtocart",function(req,res){
    Sales.find().then(function(getproduct){
        res.send(getproduct);
    }).catch(function (e){
        res.send(e);
    });
});

router.get("/getAddtocart/:company_id",function(req,res){
    var company_id = req.params.company_id;
    console.log(company_id);
        Sales.find({
            company_id: company_id
        }).then(function (addtocart) {
            res.send(addtocart);
        }).catch(function (e) {
            res.send(e);
        });

});

module.exports=router
