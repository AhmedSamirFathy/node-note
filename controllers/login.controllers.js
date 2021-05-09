const userModel = require('../models/user.models');
const bcrypt = require('bcrypt');

module.exports.login = (req, res) => {
    res.render('login.ejs', {exists: req.flash('exists'), wrongPassword: req.flash('wrongPassword'), oldInputs: req.flash('oldInputs')[0], isLoggedIn: false})
}

module.exports.handleSignin = async (req, res) => {
    const {email, password} = req.body
    let user = await userModel.findOne({email})
    if(user){
        const match = await bcrypt.compare(password, user.password);
        if(match){
            req.session.isLoggedIn = true
            req.session.userID = user._id
            var hour = 3600000
            req.session.cookie.expires = new Date(Date.now() + hour)
            req.session.cookie.maxAge = hour
            res.redirect('/home')

        }else{
            req.flash('oldInputs', {email})
            req.flash('wrongPassword', true)
            res.redirect('/login')
        }
    }else{
        req.flash('exists', true)
        res.redirect('/login')
    }
}