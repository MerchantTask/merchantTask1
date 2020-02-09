const express = require("express");
const router = express.Router();
const Company = require("../models/companyDetails");
const multer = require('multer');
const path = require('path');
var generator = require('generate-password');

var password = generator.generate({
    length: 10,
    numbers: true
});

//uploads image
var storage = multer.diskStorage({
    destination: './public/uploads',
    filename: (req, file, callback) => {
        let ext = path.extname(file.originalname);
        callback(null, file.fieldname + '-' + Date.now() + ext);
    }
});

//validations
var imageFileFilter = (req, file, cb) => {
    if (!file.originalname.match(/\.(jpg|jpeg|png|PNG|gif)$/)) {
        return cb(new Error("You can upload only image files!"), false);
    }
    cb(null, true);
};

var upload = multer({
    storage: storage,
    fileFilter: imageFileFilter,
    limits: {
        fileSize: 1000000
    }
});

//uploads image
router.post('/upload', upload.single('imageFile'), (req, res) => {
    res.json(req.file);
});

router.post("/addCompany",(req,res)=>{
   
        data = {
            'company_name': req.body.company_name,
            "address": req.body.address,
            "contact_person": req.body.contact_person,
            "contact_email": req.body.contact_email,
            "contact_phone": req.body.contact_phone,
            "company_email": req.body.company_email,
            "pan": req.body.pan,
            "verification_imagename": req.body.verification_imagename,
            "password":password
        }
    
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
console.log(companyId);
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

router.get('/merchantCount', function (req, res) {
     Company.find().count(function (err, count) {
        res.json({
            count
        });
    });
});

router.get('/merchantList', function (req, res) {
    Company.find().then(function (Merchantlist) {
       res.json(
           Merchantlist
       );
   });
});
module.exports = router;
