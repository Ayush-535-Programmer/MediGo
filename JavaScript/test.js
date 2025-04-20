const bcrypt = require('bcrypt');

async function hashPassword() {
  try {
    const hashedPassword = await bcrypt.hash("4321", 10);
    console.log(hashedPassword);
  } catch (error) {
    console.error("Error hashing password:", error);
  }
}

hashPassword();