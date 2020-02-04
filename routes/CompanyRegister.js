const express = require("express");
const router = express.Router();
const Company = require("../models/companyDetails");

router.post("/companyRegister",(req,res)=>{
    const register = new Company({
        Name: req.body.name,
        Address: req.body.Address,
        ContactPerson: req.body.ContactPerson,
        ContactPersonEmail: req.body.ContactPersonEmail,
        ContactPersonPhone: req.body.ContactPersonPhone,
        CompanyEmail: req.body.CompanyEmail,
        PAN: req.body.PAN
    });
    register
        .save()
        .then(result =>{
            res.status(201).json({
                message_success:"Added Successful"
            });
        })
        .catch(err => {
            res.status(500).json({
                message:err
            });
        });
});
module.exports = router;