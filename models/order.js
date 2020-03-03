const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const orderSchema = new Schema({
   user_id:{
       type: mongoose.Schema.Types.ObjectId,
       ref : "userRegister",
       required :true
   },
   product_id:{
       type : mongoose.Schema.Types.ObjectId,
       ref  : "product",
       required : true
   },
   order_quantity:{
       type:String,
       required: true
   },
  
});

const Order = mongoose.model("order",orderSchema);
module.exports = Order;