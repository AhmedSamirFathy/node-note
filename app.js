const express = require('express');
const app = express();
const path = require('path');
var session = require('express-session')
var flash = require('connect-flash');
const mongoose = require('mongoose');
var MongoDBStore = require('connect-mongodb-session')(session);


app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: false }))
var store = new MongoDBStore({
  uri: 'mongodb+srv://admin:admin@cluster0.82h0q.mongodb.net/NotesApp',
  collection: 'mySessions'
});
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false,
  store
}))

app.use(flash())

mongoose.connect('mongodb+srv://admin:admin@cluster0.82h0q.mongodb.net/NotesApp', { useNewUrlParser: true, useUnifiedTopology: true })

app.use(require('./routes/register.routes'))
app.use(require('./routes/login.routes'))
app.use(require('./routes/home.routes'))




app.listen(process.env.PORT || 3000, () => {
  console.log('Server is running....');
})