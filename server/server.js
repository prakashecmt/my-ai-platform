import express from "express";
import cors from "cors";

const app = express();

// ---------- MIDDLEWARE ----------
app.use(cors());
app.use(express.json());

// ---------- HEALTH CHECK (BROWSER TEST) ----------
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "AI Backend Running Successfully 🚀",
    hint: "Use POST /api/chat"
  });
});

// ---------- CHAT API (MAIN ENDPOINT) ----------
app.post("/api/chat", async (req, res) => {
  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({
        success: false,
        error: "Message is required"
      });
    }

    // -----------------------------
    // 🔥 SIMPLE AI LOGIC (REPLACE WITH OPENAI / GEMINI LATER)
    // -----------------------------
    const reply = generateAIResponse(message);

    return res.json({
      success: true,
      reply
    });

  } catch (error) {
    console.error("Error in /api/chat:", error);

    return res.status(500).json({
      success: false,
      error: "Internal Server Error"
    });
  }
});

// ---------- SIMPLE AI ENGINE (TEMP LOGIC) ----------
function generateAIResponse(message) {
  const msg = message.toLowerCase();

  if (msg.includes("hello")) return "Hello! How can I help you today?";
  if (msg.includes("hi")) return "Hi there! 👋";
  if (msg.includes("your name")) return "I am your AI Assistant.";
  if (msg.includes("who are you")) return "I am an AI built to assist you.";
  if (msg.includes("help")) return "Sure! Ask me anything and I will try to help.";

  return `You said: "${message}". I am still learning 🤖`;
}

// ---------- START SERVER ----------
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 AI Server running on port ${PORT}`);
});
