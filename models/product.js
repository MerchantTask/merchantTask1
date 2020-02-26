const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
    product_name: {
        type:String
    },
    quantity:{
        type:Number
    },
    details:{
        type:String
    },
    price:{
        type:String
    },
    image:{
        type:String
    },
    merchant_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'companydetail',
        required: true
    },
});

const Product = mongoose.model("product",productSchema);
module.exports = Product;