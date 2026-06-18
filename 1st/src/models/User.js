const mongoose = require('mongoose');

const userSchama =new mongoose.Schema({
    name: {
        type: String,
        require : true,
        unique : true
    },
    password :{
        type: String,
        require : true
    }
},{timestamps : true});

module.exports = mongoose.model('User',userSchama);