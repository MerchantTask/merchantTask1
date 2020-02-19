const express = require("express");
const router = express.Router();
const Sales = require("../models/product");

router.post("/productAdd",(req,res)=>{
    data={
        "product_name": req.body.product_name,
        "quantity" :req.body.quantity,
        "details"  : req.body.details,
        "price"    :req.body.price,
        "image"    : req.body.image
    }
    const productAdd = new Sales(data);
    productAdd.save().then(function(){
        res.send({
            message:"succces"
        })
    });
});
router.get("/getProduct",function(req,res){
    Sales.find().then(function(Addproduct){
        res.send(Addproduct);
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
module.exports=router
