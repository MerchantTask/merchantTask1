const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const companySchema = new Schema({
    Name:{
        type:String

    },
    Address:{
        type:String
    },
    ContactPerson:{
        type:String
    },
    ContactPersonEmail:{
        type:String
    },
    ContactPersonPhone:{
        type:String
    },
    CompanyEmail:{
        type:String
    },
    PAN:{
        type:Number
    }
});
const Company = mongoose.model("CompanyDetails",companySchema);
module.exports = Company;