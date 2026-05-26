require("dotenv").config();

const express = require("express");
const cors = require("cors");

const connectDB = require("./config/db");


// Connect MongoDB
connectDB();


// Initialize app
const app = express();


// Middleware
app.use(cors());

app.use(express.json());


// Routes
const chatRoutes = require("./routes/chatRoutes");

app.use("/api/chat", chatRoutes);


// Test Route
app.get("/api/test", (req, res) => {

  res.json({
    success: true,
    message: "Backend Working Successfully"
  });

});


// Root Route
app.get("/", (req, res) => {

  res.send("AI Backend Running");

});


// Port
const PORT = process.env.PORT || 5000;


// Start Server
app.listen(PORT, () => {

  console.log(`Server running on port ${PORT}`);

});
