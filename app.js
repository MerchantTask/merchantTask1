const express =  require("express");
const app = express();
const morgan = require("morgan");
const bodyparser = require('body-parser');
const mongoose = require("./dbHelper/db");
const cors = require("cors");

const loginRoute = require("./routes/login");
const CompanyRegister = require("./routes/merchant");
const topupRotue = require("./routes/merchantTopup");
const resetRoute = require("./routes/reset");
const testRoute = require("./routes/test");
const productRoute = require("./routes/product");
const cartRoute = require('./routes/cart');
const userRoute = require("./routes/userRegister");
const orderRoute = require("./routes/order");

app.use(morgan("dev"));
app.use(bodyparser.urlencoded({extended:false}));
app.use(bodyparser.json());
app.use(cors());
app.use('/uploads', express.static('./public/uploads'));


app.use("/login", loginRoute);
app.use("/Company",CompanyRegister);
app.use("/topup",topupRotue);
app.use("/reset",resetRoute);
app.use("/test",testRoute);
app.use("/",productRoute);
app.use("/",cartRoute);
app.use("/user",userRoute);
app.use("/",orderRoute);


//for handliing cors errors
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin,X-Requested-With,Content-Type,Authorization"
    );
    if (req.method === "OPTIONS") {
      res.header("Access-Control-Allow-Methods", "PUT,POST,PATCH,DELETE");
      return res.status(200).json({});
    }
    next();
  });



  //error handling
app.use((req, res, next) => {
    const error = new Error("Not found");
    error.status = 404;
    next(error);
  });
  
  app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
      error: {
        message: error.message
      }
    });
  });
  
  module.exports = app;