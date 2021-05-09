const app = require('express').Router();
const login = require('../controllers/login.controllers')

app.get('/login', login.login)

app.post('/handleSignin', login.handleSignin)

module.exports = app;