const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");

// Models
const User = require("./models/User");
const Pharmacy = require("./models/Pharmacy");
const Admin = require("./models/Admin");
const Medicine = require("./models/Medicine");

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB Connection
const MONGODB_URI = "mongodb://localhost:27017/MediGo";
mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log("✅ MongoDB connected"))
  .catch(err => console.error("❌ MongoDB connection error:", err));

// User Signup
app.post("/signup", async (req, res) => {
    const { name, phone, email, password, address, gender, dob } = req.body;
    try {
        const existingUser = await User.findOne({ phone });
        if (existingUser) return res.status(400).json({ message: "Phone already registered" });

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ name, phone, email, password: hashedPassword, address, gender, dob });
        await newUser.save();
        res.json({ message: "User registered successfully" });
    } catch (error) {
        console.error("Signup Error:", error);
        res.status(500).json({ message: "Server error" });
    }
});

// User Login
app.post("/login", async (req, res) => {
    const { phone, password } = req.body;
    try {
        const user = await User.findOne({ phone });
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(400).json({ message: "Invalid phone or password" });
        }
        res.json({ message: "Login successful", user });
    } catch (error) {
        console.error("Login Error:", error);
        res.status(500).json({ message: "Server error" });
    }
});

// Pharmacy Signup
app.post("/pharmacy/signup", async (req, res) => {
    const { pharmacyName, phone, email, password, address } = req.body;
    try {
        const existing = await Pharmacy.findOne({ phone });
        if (existing) return res.status(400).json({ message: "Phone already registered" });

        const hashedPassword = await bcrypt.hash(password, 10);
        const newPharmacy = new Pharmacy({ pharmacyName, phone, email, password: hashedPassword, address });
        await newPharmacy.save();
        res.json({ message: "Pharmacy registered successfully" });
    } catch (error) {
        console.error("Pharmacy Signup Error:", error);
        res.status(500).json({ message: "Server error" });
    }
});

// Pharmacy Login
app.post("/pharmacy/login", async (req, res) => {
    const { phone, password } = req.body;
    try {
        const pharmacy = await Pharmacy.findOne({ phone });
        if (!pharmacy || !(await bcrypt.compare(password, pharmacy.password))) {
            return res.status(400).json({ message: "Invalid phone or password" });
        }
        res.json({ message: "Login successful", pharmacy });
    } catch (error) {
        console.error("Pharmacy Login Error:", error);
        res.status(500).json({ message: "Server error" });
    }
});

// Admin Login (No signup route here to keep it secure)
app.post("/admin/login", async (req, res) => {
    const { email, password } = req.body;
    try {
        const admin = await Admin.findOne({ email });
        if (!admin || !(await bcrypt.compare(password, admin.password))) {
            return res.status(400).json({ message: "Invalid email or password" });
        }
        res.json({ message: "Admin login successful", admin });
    } catch (error) {
        console.error("Admin Login Error:", error);
        res.status(500).json({ message: "Server error" });
    }
});

// Admin: Add Medicine
app.post("/admin/add-medicine", async (req, res) => {
    const { image, name, description, category, price, needPrescription } = req.body;
  
    try {
      const newMedicine = new Medicine({
        image,
        name,
        description,
        category, // 👈 Save it to DB
        price,
        needPrescription,
      });
  
      await newMedicine.save();
      res.status(200).json({ message: "Medicine added successfully" });
    } catch (err) {
      console.error("Add Medicine Error:", err);
      res.status(500).json({ message: "Server error" });
    }
  });
  
app.get("/medicines", async (req, res) => {
    try {
        const meds = await Medicine.find();
        res.json(meds);
    } catch (error) {
        console.error("Fetch Medicines Error:", error);
        res.status(500).json({ message: "Server error" });
    }
});

// Start Server
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});
