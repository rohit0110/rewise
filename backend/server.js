const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require("dotenv").config();

// Create Express app
const app = express();
const uploadRoutes = require("./routes/upload");

// Enable CORS for all routes
app.use(cors());
app.use(express.json());

// 🔌 Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log("✅ MongoDB connected successfully"))
.catch(err => console.error("❌ MongoDB connection error:", err));

// Routes
app.get("/api/test", (req, res) => {
  res.json({ message: "Server is working! 🎉" });
});

app.use("/api/upload", uploadRoutes);

// Start server
app.listen(process.env.PORT, () => {
  console.log(`🚀 Server is running on port ${process.env.PORT}`);
});
