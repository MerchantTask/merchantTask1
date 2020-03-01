const express = require("express");
const router = express.Router();
const Sales = require("../models/product");

router.post("/productAdd",(req,res)=>{
    data={
        "product_name": req.body.product_name,
        "quantity" :req.body.quantity,
        "details"  : req.body.details,
        "price"    :req.body.price,
        "image"    : req.body.image,
        "merchant_id"    : req.body.merchant_id
    }
    const productAdd = new Sales(data);
    productAdd.save().then(function(){
        res.send({
            message:"succces"
        })
    });
});
router.get("/getmerchantProduct/:id",function(req,res){
    var id = req.params.id.toString();
  
    Sales.find({merchant_id: id}).limit(4).then(function(getProduct){
        res.send(getProduct);
    }).catch(function (e){
        res.send(e);
    });
});

router.get("/getProduct",function(req,res){
  
    Sales.find().limit(10).then(function(getProduct){
        res.send(getProduct);
    }).catch(function (e){
        res.send(e);
    });
});
router.get('/getdata/:id', function (req, res) {
    var id = req.params.id.toString();
console.log(id);
    Sales.find({
        _id: id
    }).then(function (data) {
        res.send(data[0]);
    }).catch(function (e) {
        res.send(e);
    });

});
//serarxh
router.post('/search',function(req,res){
    var product_name = req.body.product_name;
    Sales.find({
        "product_name": new RegExp(product_name,'i')
    }).then(function (search) {
        res.send(search);

    }).catch(function (e) {
        res.send(e);
    });
});
module.exports=router
