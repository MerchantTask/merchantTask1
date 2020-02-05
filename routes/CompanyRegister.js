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
                message_success:"Added Successfully"
            });
        })
        .catch(err => {
            res.status(500).json({
                message:err
            });
        });
});

router.get('/allCompanies', function (req, res) {
    Company.find().then(function (companies) {
        res.send(companies);
    }).catch(function (e) {
        res.send(e);
    });
});

router.get('/fetchSingleCompany/:id', function (req, res) {
    var companyId = req.params.id.toString();

    Company.find({
        _id: companyId
    }).then(function (company) {
        res.send(company);

    }).catch(function (e) {
        res.send(e);
    });

});

router.put('/updateCompany/:id', function (req, res) {
    CompanyId = req.params.id.toString();

    Company.findByIdAndUpdate(CompanyId, req.body, {
        new: true
    }).then(function (company) {
        res.send(company);
    }).catch(function (e) {
        res.send(e);
    });
});
router.delete('/deleteCompany/:id', function (req, res) {
    Company.findByIdAndDelete(req.params.id).then(function (company) {
        res.json({
            message: "Deleted Successfully"
        })
    }).catch(function (e) {
        res.send(e);
    });
});
module.exports = router;