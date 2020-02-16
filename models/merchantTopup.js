const mongoose = require('mongoose');
const Schema = mongoose.Schema;
var uniqueValidator = require('mongoose-unique-validator');
const topupSchema = new Schema({
    date:{
        type:Date

    },
    topup_amount:{
        type:String,
        required: [true, 'Your Topup Amount is Empty']

    },
    mode_of_payment:{
        type:String,
        required: [true, 'Your Mode of payment is Empty']

    },
    remarks:{
        type:String,
        required: [true, 'Your Remars is Empty']

    },
    company_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'companydetail',
        required: true
    }
});
topupSchema.plugin(uniqueValidator);

const merchanttopup = mongoose.model("merchantTopup",topupSchema);
module.exports = merchanttopup;