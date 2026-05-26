import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// Health check (browser)
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "AI Backend Running 🚀"
  });
});

// Chat API
app.post("/api/chat", async (req, res) => {
  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({
        success: false,
        error: "Message required"
      });
    }

    return res.json({
      success: true,
      reply: `You said: ${message}`
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: "Server error"
    });
  }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});