const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const topupSchema = new Schema({
    date:{
        type:Date

    },
    topup_amount:{
        type:String
    },
    mode_of_payment:{
        type:String
    },
    remarks:{
        type:String
    },
    company_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'companydetail',
        required: true
    }
});
const merchanttopup = mongoose.model("merchantTopup",topupSchema);
module.exports = merchanttopup;