const express = require("express");
const router = express.Router();
const Company = require("../models/companyDetails");


router.post("/addCompany",(req,res)=>{
   
        data = {
            'company_name': req.body.company_name,
            "address": req.body.address,
            "contact_person": req.body.contact_person,
            "contact_email": req.body.contact_email,
            "contact_phone": req.body.contact_phone,
            "company_email": req.body.company_email,
            "pan": req.body.pan}
    
        var addCompany = new Company(data);
        addCompany.save().then(function () {
            res.send({
                message: "Succesfull"
            })
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