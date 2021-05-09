const app = require('express').Router();
const validation = require('../validation/register.validation')
const register = require('../controllers/register.controllers')

app.get('/', register.register)

app.post('/handleSignUp', validation, register.handleSignup)


module.exports = app;