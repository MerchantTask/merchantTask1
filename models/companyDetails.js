const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const companySchema = new Schema({
    company_name:{
        type:String
    },
    address:{
        type:String
    },
    contact_person:{
        type:String
    },
    contact_email:{
        type:String
    },
    contact_phone:{
        type:String
    },
    company_email:{
        type:String
    },
    pan:{
        type:Number
    }
});
const Company = mongoose.model("companydetail",companySchema);
module.exports = Company;