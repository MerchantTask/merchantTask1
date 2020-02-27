const express = require("express");
const router = express.Router();
const Sales = require("../models/cart");
// const Company = require("../models/merchantDetails");

router.post("/Addtocart",(req,res)=>{
    Sales.findOne({product_id:req.body.product_id, user_id:req.body.user_id }, function (err, user) {
        if(user){
             res.send({message:"Already Added"});
        }else{
    data={
        "product_name": req.body.product_name,
        "quantity" :req.body.quantity,
        "details"  : req.body.details,
        "price"    :req.body.price,
        "image"    : req.body.image,
        "remarks"  :req.body.remarks,
        "user_id"  :req.body.user_id,
        "product_id" : req.body.product_id
    }
    const productAdd = new Sales(data);
    productAdd.save().then(function(){
        
        }).then(function (data) {
            res.json({
                message: "Succesfull"
            });
        }) .catch(function (e) {
            res.send(e);
        });
           
    }
});
});

router.delete('/removeFormCart/:id', function (req, res) {
    id = req.params.id.toString();
    Sales.findByIdAndDelete(id).then(function () {
        res.send({
            message: "succesfully removed"
        })
    })

})
router.get("/getAddtocart",function(req,res){
    Sales.find().then(function(getproduct){
        res.send(getproduct);
    }).catch(function (e){
        res.send(e);
    });
});

router.get("/getAddtocart/:user_id",function(req,res){
     user_id = req.params.user_id.toString();
    console.log(user_id);
        Sales.find({
            user_id: user_id
        }).then(function (addtocart) {
            res.send(addtocart);
        }).catch(function (e) {
            res.send(e);
        });

});

module.exports=router
