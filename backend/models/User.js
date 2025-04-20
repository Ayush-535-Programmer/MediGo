const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: String,
    phone: { type: String, unique: true },
    email: String,
    password: String,
    address: String,
    gender: String, 
    dob: String
});

const User = mongoose.model("User", userSchema);

module.exports = User;
