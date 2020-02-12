const mongoose = require('mongoose');
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');

const Schema = mongoose.Schema;
const adminSchema = new Schema({
  username: {
    type: String
  },
  password: {
    type: String
  },
  reset_password_token: {
    type: String
  },
  reset_password_expires: {
    type: Date
  },
  tokens: [{
    token: {
      type: String,
      required: true
    }
  }]
});
adminSchema.statics.checkCrediantialsDb = async (username, password,callback) => {
  const user = await Admin.findOne({
    username: username
  });
  
  if (user) {
    var hashedPassword= user.password;
    if(bcrypt.compareSync(password, hashedPassword)) {
      return user;
    }

 
};

};

adminSchema.methods.generateAuthToken = async function () {
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

const Admin = mongoose.model("admin", adminSchema);
module.exports = Admin;