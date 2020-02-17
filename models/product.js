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
    }
});

const Sales = mongoose.model("Sales",salesSchema);
module.exports = Sales;