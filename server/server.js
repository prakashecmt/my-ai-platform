require("dotenv").config();

const express = require("express");
const cors = require("cors");
const path = require("path");

const connectDB = require("./config/db");


// Connect MongoDB
connectDB();


// Initialize Express
const app = express();


// Middleware
app.use(cors());

app.use(express.json());


// Routes
const chatRoutes = require("./routes/chatRoutes");

app.use("/api/chat", chatRoutes);


// Static Frontend
app.use(
  express.static(
    path.join(__dirname, "dist")
  )
);


// API Test
app.get("/api/test", (req, res) => {

  res.json({
    success: true,
    message: "Backend Working"
  });

});


// React Frontend Route
app.use((req, res) => {

  res.sendFile(
    path.join(__dirname, "dist", "index.html")
  );

});


// PORT
const PORT = process.env.PORT || 5000;


// Start Server
app.listen(PORT, () => {

  console.log(`Server running on port ${PORT}`);

});