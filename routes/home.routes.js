const app = require('express').Router();
const auth = require('../middleware/auth')
const homeController = require('../controllers/home.controllers')

app.get('/home',auth, homeController.home)
app.get('/logout', homeController.logout)
app.post('/addNote', homeController.addNote)
app.post('/deleteNote', homeController.deleteNote)
app.post('/editNote', homeController.editNote)

module.exports = app;