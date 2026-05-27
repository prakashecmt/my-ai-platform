import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import axios from "axios";
import path from "path";

dotenv.config();

const app = express();

/* ---------------- MIDDLEWARE ---------------- */

// Allow JSON
app.use(express.json());

// CORS (safe for dev + prod)
app.use(cors());

/* ---------------- DEBUG ---------------- */

console.log(
  "OPENROUTER KEY LOADED:",
  process.env.OPENROUTER_API_KEY ? "YES" : "NO"
);

/* ---------------- API ROUTE ---------------- */

app.post("/api/chat", async (req, res) => {
  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({
        success: false,
        reply: "Message is required"
      });
    }

    if (!process.env.OPENROUTER_API_KEY) {
      return res.status(500).json({
        success: false,
        reply: "OPENROUTER_API_KEY missing in .env"
      });
    }

    const response = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "openai/gpt-3.5-turbo",
        messages: [
          {
            role: "user",
            content: message
          }
        ]
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "Content-Type": "application/json"
        }
      }
    );

    const reply =
      response.data.choices?.[0]?.message?.content ||
      "No response from AI";

    return res.json({
      success: true,
      reply
    });

  } catch (error) {
    console.error("AI ERROR:", error.response?.data || error.message);

    return res.status(500).json({
      success: false,
      reply: "AI Error occurred"
    });
  }
});

/* ---------------- HEALTH CHECK ---------------- */

app.get("/", (req, res) => {
  res.send("AI Backend Running 🚀");
});

/* ---------------- PRODUCTION FIX (IMPORTANT) ---------------- */
/* If you deploy frontend inside same backend later */

if (process.env.NODE_ENV === "production") {
  const __dirname = path.resolve();

  app.use(express.static(path.join(__dirname, "client/dist")));

  app.get("*", (req, res) => {
    res.sendFile(
      path.resolve(__dirname, "client/dist/index.html")
    );
  });
}

/* ---------------- START SERVER ---------------- */

const PORT = process.env.PORT || 5000;

app.listen(PORT, "0.0.0.0", () => {
  console.log("🚀 Server running on port", PORT);
});