const express = require("express");

const router = express.Router();

const generateAIResponse = require("../services/geminiService");


router.post("/", async (req, res) => {

  try {

    const userMessage = req.body.message;

    const aiReply = await generateAIResponse(userMessage);

    res.json({
      success: true,
      reply: aiReply
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message: "AI Error"
    });

  }

});

module.exports = router;