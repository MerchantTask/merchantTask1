const mongoose = require("mongoose");

const url = "mongodb://localhost:27017/merchantTask1";
const connect = mongoose.connect(url, {
  useNewUrlParser: true,
  useCreateIndex: true
});

connect.then(
  db => {
    console.log(
      "Connected to mongodb server at port 27017 with db name MerchantTask1"
    );
  },
  err => {
    console.log(err);
  }
);