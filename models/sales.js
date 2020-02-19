const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const salesSchema = new Schema({
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
    remarks : {
        type:String
    },
    company_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'companydetail',
        required: true
    }
});

const AddtoCart = mongoose.model("addtoCart",salesSchema);
module.exports = AddtoCart;