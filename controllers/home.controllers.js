const noteModel = require('../models/notes.models')


module.exports.home = async (req, res) => {
    let notes = await noteModel.find({userID: req.session.userID})
    res.render('home.ejs', {isLoggedIn: req.session.isLoggedIn, notes})
    // res.json(notes)
}

module.exports.logout = (req, res) => {
    req.session.destroy(() => {
        res.redirect('/login')
    })
}

module.exports.addNote = async (req, res) => {
    const {title, desc} = req.body
    await noteModel.insertMany({title, desc, userID:req.session.userID})
    res.redirect('/home')
}

module.exports.deleteNote = async (req, res) => {
    
    // console.log(req.body);
    await noteModel.findByIdAndDelete({_id: req.body.delete})
    res.redirect('/home')
}

module.exports.editNote = async (req, res) => {
    const {_id, title, desc} = req.body
    await noteModel.findByIdAndUpdate({_id}, {title, desc})
    res.redirect('/home')
}


