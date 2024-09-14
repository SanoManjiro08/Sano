const axios = require('axios');

module.exports = {
  config: {
    name: "sano", // name of the command
    description: "AI-powered assistant using multiple API services", // description of the command
    usage: "<message>", // usage of the command
    cooldown: 5, // a cooldown for the command (default is 5 seconds)
    accessableby: 0, // 0 is for everyone, 1 is for bot owner/admin
    category: "AI", // category of the command
    prefix: false,  // command requires a prefix
  },
  start: async function ({ api, text, react, event, reply }) {
    // Extract the user's input message
    let userMessage = text.join(" ").trim();

    // If no message is provided, ask for input
    if (!userMessage) {
      return reply("Please provide a question to get an answer.");
    }

    // React to the message
    react("🤖");

    // Get the AI response
    try {
      const { response, messageID } = await getAIResponse(userMessage, event.senderID, event.messageID);
      return api.sendMessage(
        `🧋✨ | 𝚂𝚊𝚗𝚘 𝙰𝚒\n━━━━━━━━━━━━━━━━\n${response}\n━━━━━━━━━━━━━━━━`,
        event.threadID,
        messageID
      );
    } catch (error) {
      console.error("Error in start:", error.message);
      return reply("An error occurred while processing your request.");
    }
  },
  auto: async function ({ api, event, text, reply }) {
    // Auto-reply when someone says 'hi'
    if (event.body.toLowerCase() === "hi") {
      return reply("Hello! How can I assist you today?");
    }
  }
};

// Helper function to get AI response
async function getAIResponse(question, userId, messageID) {
  try {
    const response = await getAnswerFromAI(question);
    return { response, messageID };
  } catch (error) {
    console.error("Error in getAIResponse:", error.message);
    throw error;
  }
}

// Function to cycle through multiple AI services
async function getAnswerFromAI(question) {
  try {
    const services = [
      { url: 'https://markdevs-last-api.onrender.com/gpt4', params: { prompt: question, uid: 'your-uid-here' } },
      { url: 'http://markdevs-last-api.onrender.com/api/v2/gpt4', params: { query: question } },
      { url: 'https://markdevs-last-api.onrender.com/api/v3/gpt4', params: { ask: question } }
    ];

    // Try each service and return the first valid response
    for (const service of services) {
      const data = await fetchFromAI(service.url, service.params);
      if (data) return data;
    }

    throw new Error("No valid response from any AI service");
  } catch (error) {
    console.error("Error in getAnswerFromAI:", error.message);
    throw new Error("Failed to get AI response");
  }
}

// Function to fetch data from each AI service
async function fetchFromAI(url, params) {
  try {
    const { data } = await axios.get(url, { params });
    const response = data.gpt4 || data.reply || data.response || data.answer || data.message;

    if (response) {
      console.log("AI Response:", response);
      return response;
    } else {
      throw new Error("No valid response from AI");
    }
  } catch (error) {
    console.error("Network Error:", error.message);
    return null;
  }
}