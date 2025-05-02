const axios = require("axios");

const HUGGINGFACE_API_KEY = process.env.HF_API_KEY;

const embeddingModel = "sentence-transformers/all-MiniLM-L6-v2";
const chatModel = "mistralai/Mistral-7B-Instruct-v0.2"; // You can change this if needed

// Get Embedding from Hugging Face
async function getEmbedding(text) {
  try {
    const response = await axios.post(
      `https://api-inference.huggingface.co/pipeline/feature-extraction/${embeddingModel}`,
      { inputs: text },
      {
        headers: {
          Authorization: `Bearer ${HUGGINGFACE_API_KEY}`,
        },
      }
    );

    if (!Array.isArray(response.data)) {
      throw new Error("Embedding response is not an array.");
    }
    console.log("Embedding Response:", response.data);

    return response.data; // Return the embedding vector
  } catch (err) {
    console.error("Embedding Error:", err.response?.data || err.message);
    throw new Error("Failed to get embedding");
  }
}
// Get Fit Explanation using a chat model
async function getFitExplanation(jobText, resumeText) {
    try {
      const prompt = `You are a recruitment AI that evaluates resume-job fit.\nJob: ${jobText}\nResume: ${resumeText}\nExplain why this candidate is a good fit:`;
  
      const response = await axios.post(
        `https://api-inference.huggingface.co/models/${chatModel}`,
        { inputs: prompt },
        {
          headers: {
            Authorization: `Bearer ${HUGGINGFACE_API_KEY}`,
          },
        }
      );
  
      if (response.data && typeof response.data[0]?.generated_text === "string") {
        return response.data[0].generated_text.trim();
      }
  
      return "No explanation generated.";
    } catch (err) {
      console.error("Fit Explanation Error:", err.response?.data || err.message);
      throw new Error("Failed to get fit explanation");
    }
  }
  module.exports = { getEmbedding, getFitExplanation };


