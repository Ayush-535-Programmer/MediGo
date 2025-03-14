const express = require("express");
const fs = require("fs");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

const USERS_FILE = "users.json";

// Helper function to read users
const readUsers = () => {
    if (!fs.existsSync(USERS_FILE)) return [];
    const data = fs.readFileSync(USERS_FILE);
    return JSON.parse(data);
};

// Helper function to write users
const writeUsers = (users) => {
    fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2));
};

// **Signup Route**
app.post("/signup", (req, res) => {
    const { name, phone, email, password, address, gender, dob } = req.body;
    let users = readUsers();

    // Check if phone already exists
    if (users.some(user => user.phone === phone)) {
        return res.status(400).json({ message: "Phone number already registered" });
    }

    // Add new user
    users.push({ name, phone, email, password, address, gender, dob });
    writeUsers(users);

    res.json({ message: "User registered successfully" });
});

// **Login Route**
app.post("/login", (req, res) => {
    const { phone, password } = req.body;
    let users = readUsers();

    // Find user by phone
    const user = users.find(user => user.phone === phone);
    if (!user || user.password !== password) {
        return res.status(400).json({ message: "Invalid phone or password" });
    }

    res.json({ message: "Login successful", user });
});

// Start server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
