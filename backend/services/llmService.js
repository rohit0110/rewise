const axios = require("axios");

async function generateFlashcard(text) {
  try {
    const response = await axios.post("http://localhost:11434/api/generate", {
      model: "gemma:2b-instruct",
      prompt: `Generate Questions for Flashcards along with answers from:\n\n${text}`,
      stream: false,
    });

    const parsed = parseQAPairs(response.data.response);
    console.log("Parsed Q&A pairs:", parsed);
    return parsed;
  } catch (err) {
    console.error("LLM generation failed:", err.message);
    throw err;
  }
}

// async function generateMCQ(text) {
//     try {
//       const response = await axios.post("http://localhost:11434/api/generate", {
//         model: "gemma:2b-instruct",
//         prompt: `Generate Questions for MCQ with answers from:\n\n${text}`,
//         stream: false,
//       });
  
//       return response.data.response;
//     } catch (err) {
//       console.error("LLM generation failed:", err.message);
//       throw err;
//     }
//   }

  function parseQAPairs(rawText) {
    const questions = [];
    const lines = rawText.split("\n").map(line => line.trim());
  
    let currentSection = null;
    const qList = [];
    const aList = [];
  
    for (let line of lines) {
      if (line.toLowerCase().startsWith("**questions")) {
        currentSection = "questions";
        continue;
      }
      if (line.toLowerCase().startsWith("**answers")) {
        currentSection = "answers";
        continue;
      }
  
      if (/^\d+\.\s/.test(line)) {
        const content = line.replace(/^\d+\.\s/, "");
        if (currentSection === "questions") qList.push(content);
        else if (currentSection === "answers") aList.push(content);
      }
    }
  
    for (let i = 0; i < Math.min(qList.length, aList.length); i++) {
      questions.push({
        question: qList[i],
        answer: aList[i],
      });
    }
  
    return questions;
  }
  
module.exports = { generateFlashcard };
