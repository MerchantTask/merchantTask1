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
    },
    current_balance:{
        type:Number,
        default:0
    },
    verification_imagename:{
        type:String
    },
    password:{
        type:String
    }
});
companySchema.statics.checkCrediantialsDb = async (company_email, password) => {
    const user = await Company.findOne({ company_email: company_email, password: password });
    if (user) {
      return user;
    }
  };
const Company = mongoose.model("companydetail",companySchema);
module.exports = Company;