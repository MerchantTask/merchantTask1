const mongoose = require('mongoose');
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');
const validator = require('validator')
var uniqueValidator = require('mongoose-unique-validator');
const Schema = mongoose.Schema;

const companySchema = new Schema({
    company_name:{
        type:String,
        unique: true,
        lowercase: true,
        required: [true, 'Your Company Name is Empty']
    },
    address:{
        type:String,
        required: [true, 'Your Address is Empty']
    },
    contact_person:{
        type:String,
        required: [true, 'Your Contact Person is Empty']
    },
    contact_email:{
        type:String,
        required: [true, 'Your email is Empty'],
        unique: true,
        lowercase: true,
        validate:{
          validator: validator.isEmail,
          message: 'Enter valid email',
          isAsync: false
        }
    },
    contact_phone:{
        type:String,
        required: [true, 'Your Contact Number is Empty']
    },
    company_email:{
        type:String,
        required: [true, 'Your email is Empty'],
        unique: true,
        lowercase: true,
        validate:{
          validator: validator.isEmail,
          message: 'Enter valid email',
          isAsync: false
        }
    },
    pan:{
        type:Number,
        unique: true,
        required: [true, 'Your Pan is Empty']
    },
    current_balance:{
        type:Number,
        default:0
    },
    verification_imagename:{
        type:String
    },
    password:{
        type:String,
        required: [true, 'Your Password is Empty'],
        minlength: [8, 'Password length is short'],
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

companySchema.plugin(uniqueValidator);

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