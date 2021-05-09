const mongoose = require('mongoose')

const noteSchema = mongoose.Schema({
    title: String,
    desc: String, 
    userID: mongoose.Schema.Types.ObjectId
})

const noteModel = mongoose.model('note', noteSchema)

module.exports = noteModel