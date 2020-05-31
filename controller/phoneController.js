const express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const Phone = mongoose.model('Phone');

router.get('/', (req, res) => {
    res.render("phone/addOredit", {
        viewTitle: "Add new contact"
    })
});
router.post('/', (req, res) => {
    if(req.body._id == '')
    insert(req, res);
    else
    update(req,res);
})
function insert(req, res) {
    var phone = new Phone();
    phone.name = req.body.name;
    phone.dob = req.body.dob;
    phone.mobile = req.body.mobile;
    phone.email = req.body.email;
    phone.save((err, doc) => {
        if (!err) {
            res.redirect('phone/list');
        }
        else {
            if (err.name == 'ValidationError'){
                handleValidationError(err, req.body);
                res.render("phone/addOredit", {
                    viewTitle: "Add new contact",
                    phone: req.body   
                })
            }
            else
                console.log("Error during record insertion :" + err)
        }
    });
}
function update(req,res) {
    Phone.findOneAndUpdate({_id: req.body._id}, req.body, {new: true}, (err,doc) =>{
        if(!err)
        {
            res.redirect('phone/list');
        }
        else{
            if(err.name=='ValidationError'){
                handleValidationError(err,req.body);
                res.render("phone/addOredit", {
                    viewTitle: "Update contact",
                    phone: req.body   
                });
            }
            else
                console.log("error" + err);
            
        }
    });
}
    router.get('/list', (req, res) => {
        Phone.find((err,docs)=> {
            if(!err){
                res.render("phone/list",{
                    list: docs
                });
            }
            else{
                console.log("error" + err);
            }
           
        });
    });  
    function handleValidationError(err, body) {
        for (field in err.errors) 
        {
            switch (err.errors[field].path) {
                case 'name':
                    body['nameError'] = err.errors[field].message;
                    break;
                case 'email':
                    body['emailError'] = err.errors[field].message;
                    break;
                default:
                    break;
            }
        }
    }
    router.get('/:id',(req,res) =>{
       Phone.findById(req.params.id, (err,docs) =>{
           if(!err){
               res.render("phone/addOredit",{
                   viewTitle: "Update Contact",
                    phone:docs
               });
           }
       }) ;
    });
    router.get('/delete/:id', (req,res) =>{
        Phone.findByIdAndDelete(req.params.id, (err,docs) => {
            if(!err){
                res.redirect('/phone/list');
            }
            else{
                console.log("error" + err);
            }
        })
    })
module.exports = router;
