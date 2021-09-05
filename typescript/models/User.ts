import mongoose = require("mongoose");
const Schema = mongoose.Schema;

const User  = new Schema({

    Name: {
        type: String,
        required: true
    },

    Email: {
        type: String,
        required: true,
        unique: true
    },

    Password: {
        type: String,
        required: true
    },

    Avatar: String,

});

module.exports = mongoose.model("user", User)