const express = require("express");
const fs = require("fs");
const path = require("path");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const PORT = 5000;

const USERS_FILE = path.join(__dirname, "users.json");

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Utility function to generate unique 4-digit ID
const generateUniqueId = (existingIds) => {
  let id;
  do {
    id = Math.floor(1000 + Math.random() * 9000); // Random 4-digit
  } while (existingIds.includes(id));
  return id;
};

// Endpoint to handle registration
app.post("/register", (req, res) => {
  const { name, email, password } = req.body;

  // Read current users
  let users = [];
  if (fs.existsSync(USERS_FILE)) {
    const data = fs.readFileSync(USERS_FILE, "utf-8");
    users = data ? JSON.parse(data) : [];
  }

  // Check if email already exists
  const existingUser = users.find((user) => user.email === email);
  if (existingUser) {
    return res.json({ success: false, message: "User already exists" });
  }

  // Generate new user ID
  const existingIds = users.map((u) => u.id);
  const newId = generateUniqueId(existingIds);

  // Save new user
  const newUser = { id: newId, name, email, password };
  users.push(newUser);
  fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2));

  res.json({
    success: true,
    message: "User registered successfully",
    id: newId,
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
