import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

/* ---------------- HEALTH CHECK ---------------- */
app.get("/", (req, res) => {
  res.json({ success: true, message: "AI Backend Running 🚀" });
});

/* ---------------- CHAT API ---------------- */
app.post("/api/chat", async (req, res) => {
  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({
        success: false,
        error: "Message is required"
      });
    }

    // 🔥 Replace later with OpenAI / Gemini
    const reply = generateAI(message);

    return res.json({
      success: true,
      reply
    });

  } catch (err) {
    return res.status(500).json({
      success: false,
      error: "Server error"
    });
  }
});

/* ---------------- SIMPLE AI LOGIC ---------------- */
function generateAI(message) {
  const msg = message.toLowerCase();

  if (msg.includes("hello")) return "Hello! 👋 How can I help you?";
  if (msg.includes("who are you")) return "I am your AI assistant 🤖";
  if (msg.includes("help")) return "Ask me anything!";
  if (msg.includes("ai")) return "AI means Artificial Intelligence 🤖";

  return `You said: ${message}`;
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("Server running on port", PORT);
});