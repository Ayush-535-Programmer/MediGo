const mongoose = require("mongoose");

const pharmacySchema = new mongoose.Schema({
    pharmacyName: String,
    phone: { type: String, unique: true },
    email: { type: String, unique: true },
    password: String,
    address: String
});

const Pharmacy = mongoose.model("Pharmacy", pharmacySchema);
module.exports = Pharmacy;
