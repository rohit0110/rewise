const express = require('express');
const cors = require('cors');
require("dotenv").config();

// Create Express app
const app = express();

// Enable CORS for all routes
app.use(cors());

// Parse JSON request bodies
app.use(express.json());

// Define a test route
app.get("/api/test", (req, res) => {
  res.json({ message: "Server is working! 🎉" });
});

//start server
app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});