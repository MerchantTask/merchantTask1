const express = require("express");
const router = express.Router();
const OrderModule = require("../models/order");
const product = require("../models/product");
router.post("/postOrder", function(req,res){
    data={
        "user_id": req.body.user_id,
        "product_id": req.body.product_id,
        "order_quantity": req.body.order_quantity
    }
    var order = new OrderModule(data);
    order.save().then(function(buy){
        console.log(buy);
        product.findByIdAndUpdate(req.body.product_id,{$inc : {quantity:-req.body.order_quantity}},{
            new: true
        }).then(function(){
            res.send({
                message:"order sucessful"
            });
        }).catch(function(e){
            res.send(e);
        })
    });
});

module.exports=router;