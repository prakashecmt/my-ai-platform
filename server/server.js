import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

/* ---------------------------
   HEALTH CHECK (BROWSER TEST)
----------------------------*/
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "AI Backend Running 🚀"
  });
});

/* ---------------------------
   CHAT API (POST ONLY)
----------------------------*/
app.post("/api/chat", async (req, res) => {
  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({
        success: false,
        error: "Message is required"
      });
    }

    // 🔥 SIMPLE AI LOGIC (replace with OpenAI/Gemini later)
    const reply = `You said: ${message}`;

    return res.json({
      success: true,
      reply
    });

  } catch (error) {
    console.error("Error:", error);

    return res.status(500).json({
      success: false,
      error: "Internal Server Error"
    });
  }
});

/* ---------------------------
   OPTIONAL: FIX BROWSER ERROR
   (so /api/chat doesn't show Cannot GET)
----------------------------*/
app.get("/api/chat", (req, res) => {
  res.json({
    success: false,
    message: "Use POST method for this endpoint"
  });
});

/* ---------------------------
   START SERVER
----------------------------*/
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});