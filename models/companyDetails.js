const mongoose = require('mongoose');
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');
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
    },
    loginattempt:{
        type:Number,
        default:0
    },
    tokens: [{
      token: {
        type: String,
        required: true
      }
    }]
});


companySchema.statics.checkCrediantialsDb = async (company_name, password,callback) => {
    const user = await Company.findOne({
        company_name: company_name
    });
    
    if (user) {
      var hashedPassword= user.password;
      if(bcrypt.compareSync(password, hashedPassword)) {
        return user;
      }
  
   
  };
  
  };
  
  companySchema.methods.generateAuthToken = async function () {
    const user = this;
    const token = jwt.sign({
      _id: user._id.toString()
    }, "merchanttask", {
      expiresIn: "60m"
    });
    console.log(token);
    user.tokens = user.tokens.concat({
      token: token
    });
    await user.save();
  
    return token;
  };

const Company = mongoose.model("companydetail",companySchema);
module.exports = Company;