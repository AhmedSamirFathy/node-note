const app = require('express').Router();
const auth = require('../middleware/auth')
const noteModel = require('../models/notes.models')

app.get('/home',auth, async (req, res) => {
    let notes = await noteModel.find({userID: req.session.userID})
    res.render('home.ejs', {isLoggedIn: req.session.isLoggedIn, notes})
    // res.json(notes)
})

app.get('/logout', (req, res) => {
    req.session.destroy(() => {
        res.redirect('/login')
    })
})

app.post('/addNote', async (req, res) => {
    const {title, desc} = req.body
    await noteModel.insertMany({title, desc, userID:req.session.userID})
    res.redirect('/home')
})

app.post('/deleteNote', async (req, res) => {
    
    // console.log(req.body);
    await noteModel.findByIdAndDelete({_id: req.body.delete})
    res.redirect('/home')
})

app.post('/editNote', async (req, res) => {
    const {_id, title, desc} = req.body
    await noteModel.findByIdAndUpdate({_id}, {title, desc})
    res.redirect('/home')
})

module.exports = app;