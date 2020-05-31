const mongoose = require("mongoose");

mongoose.connect('mongodb://localhost:27017/PhoneDB', {useNewUrlParser :true},(err) =>{
    if(!err)
    {
        console.log("Connected");
    }
    else{
        console.log("erorr" + err);
    }
});

require('./phone.model');

