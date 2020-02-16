const mongoose = require('mongoose');
const validator = require('validator')
var uniqueValidator = require('mongoose-unique-validator');

const Schema = mongoose.Schema;

const testSchema = new Schema({
  username: {
    type: String,
     unique: true,
     lowercase: true,
     required: [true, 'Your Username is Empty']
  },
  password: {
    type: String,
    required: [true, 'Your Password is Empty'],
    minlength: [8, 'Password length is short'],
  },
  email: {
    type: String,
    required: [true, 'Your email is Empty'],
    unique: true,
    lowercase: true,
    validate:{
      validator: validator.isEmail,
      message: 'Enter valid email',
      isAsync: false
    }
},
  reset_password_token: {
    type: String
  },
  reset_password_expires: {
    type: Date
  },

});
testSchema.plugin(uniqueValidator);

const Test = mongoose.model("test", testSchema);
module.exports = Test;