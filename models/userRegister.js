const mongoose = require('mongoose');
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');
const validator = require('validator')
var uniqueValidator = require('mongoose-unique-validator');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    full_name:{
        type:String,
        required: [true,"please enter you full name"]
    },
    phone:{
        type:String,
        required: [true,"please enter your Phone number"]
    },

    address:{
        type:String,
        required: [true,"please enter you Address"]
    },
    email:{
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
    password:{
        type:String,
        required: [true, 'Your Password is Empty'],
        minlength: [8, 'Password length is short'],
    },
    tokens: [{
        token: {
        type: String,
        required: true
        }
    }]
});

userSchema.plugin(uniqueValidator);

userSchema.statics.checkCrediantialsDb = async (email, password,callback) => {
    const user = await User.findOne({
        email: email
    });
    
    if (user) {
      var hashedPassword= user.password;
      if(bcrypt.compareSync(password, hashedPassword)) {
        return user;
      }
  
    };
  };

  userSchema.methods.generateAuthToken = async function () {
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
const User = mongoose.model("userRegister",userSchema);
module.exports = User;