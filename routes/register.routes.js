const app = require('express').Router();
const {validationResult} = require('express-validator')
const validation = require('../validation/register.validation')
const userModel = require('../models/user.models')
const bcrypt = require('bcrypt');

app.get('/', (req, res) => {
    res.render('register.ejs', {error: req.flash('error'), oldInputs: req.flash('oldInputs')[0], exists: req.flash('exists'), isLoggedIn: false})
})

app.post('/handleSignUp', validation, async (req, res) => {
    const {name, email, password, confirmPassword} = req.body
    const error = validationResult(req)
    if(error.isEmpty()){
        // insert into db
        let user = await userModel.findOne({email})
        if(user){
            req.flash('exists', true)
            res.redirect('/')
        }else{
            bcrypt.hash(password, 7, async function(err, hash) {
                await userModel.insertMany({name, email, password: hash})
                res.redirect('/login')
            });
        }

    }else{
        req.flash('error', error.array())
        req.flash('oldInputs', {name, email, password, confirmPassword})
        res.redirect('/')
    }
})


module.exports = app;