const axios = require("axios");

async function generateFlashcard(text) {
  try {
    const response = await axios.post("http://localhost:11434/api/generate", {
      model: "gemma:2b-instruct",
      prompt: `Generate Questions for Flashcards along with answers from:\n\n${text}`,
      stream: false,
    });

    return response.data.response;
  } catch (err) {
    console.error("LLM generation failed:", err.message);
    throw err;
  }
}

async function generateMCQ(text) {
    try {
      const response = await axios.post("http://localhost:11434/api/generate", {
        model: "gemma:2b-instruct",
        prompt: `Generate Questions for MCQ with answers from:\n\n${text}`,
        stream: false,
      });
  
      return response.data.response;
    } catch (err) {
      console.error("LLM generation failed:", err.message);
      throw err;
    }
  }

module.exports = { generateFlashcard, generateMCQ };
