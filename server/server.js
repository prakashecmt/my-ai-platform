import express from "express";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("AI Backend Running 🚀");
});

app.post("/api/chat", (req, res) => {
  const { message } = req.body;

  res.json({
    success: true,
    reply: `You said: ${message}`
  });
});

/* 🔥 IMPORTANT FIX FOR RAILWAY */
const PORT = process.env.PORT || 3000;

app.listen(PORT, "0.0.0.0", () => {
  console.log("Server running on port", PORT);
});