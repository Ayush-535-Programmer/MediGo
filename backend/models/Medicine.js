const mongoose = require("mongoose");

const medicineSchema = new mongoose.Schema({
    image: String,
    name: String,
    description: String,
    category: String,
    price: Number,
    needPrescription: String,
  });
const Medicine = mongoose.model("Medicine", medicineSchema);
module.exports = Medicine;
