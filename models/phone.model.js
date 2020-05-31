const mongoose = require('mongoose');

var phoneSchema = new mongoose.Schema({
    name : {
        type: String,
        required: 'This field is required'
    },
    dob:{
        type: String
    },
    mobile: {
        type: String
    },
    email: {
        type: String
    }
});
phoneSchema.path('email').validate((val) => {
    emailRegex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
    return emailRegex.test(val);
}, 'Invalid email.');

mongoose.model('Phone', phoneSchema);