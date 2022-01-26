const mongoose = require('mongoose')

const PostSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },

    email: {
        type: String,
        required: true,
        unique: true
    },
    
    gender: {
        type: String,
        required: true
    },

    status: {
        type: String,
        required: true
    },

})

module.exports = mongoose.model('Users', PostSchema)