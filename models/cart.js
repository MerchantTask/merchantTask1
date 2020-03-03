const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cartSchema = new Schema({
    
    remarks : {
        type:String
    },
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'userRegister',
        required: true
    },
    product_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"product",
        required: true
        }
});

const Cart = mongoose.model("addtoCart",cartSchema);
module.exports = Cart;