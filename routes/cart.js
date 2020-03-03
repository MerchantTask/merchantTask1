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
router.get("/getCart/:user_id",function(req,res){
    user_id = req.params.user_id.toString();
    Sales.find({user_id: user_id})
 .populate('product_id')
 .exec()
 .then(function (cart) {

     if (cart) {
         res.json({
             carts: cart.map(doc => {
                 return {
                     _id: doc._id,
                     user_id: doc.user_id,
                     remarks: doc.remarks,
                     product_id: doc.product_id
                     
                 };
                
               
             })
             
         })
      
     }
 })

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
router.put("/buy/:id",function(req,res){
    id = req.params.product_id.toString();
    Sales.updateMany({
        _id : { $in : id}        // conditions
    }, {
        $inc: { quantity: -req.body.quantity},

        $set: {remarks:req.body.remarks} // document
    },function(err, result) {
        if (err) {
            console.log(err);
        } else {
            console.log("result");
        }
    });
});
    //  Sales.findByIdAndUpdate(id,{$set:{remarks:req.body.remarks, $inc: { quantity: req.body.quantity}}} , {
    //         new: true
    //     }).then(function (company) {
    //         res.send(company);
    //     }).catch(function (e) {
    //         res.send(e);
    //     });
    // });


module.exports=router
