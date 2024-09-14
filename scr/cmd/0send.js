const axios = require('axios');

module.exports = {
  config: {
    name: "shoti", // name of the command
    description: "Sends a random Shoti video", // description of the command
    usage: "shoti", // usage of the command
    cooldown: 5, // a cooldown for the command (default is 5 seconds)
    accessableby: 0, // 0 is for everyone, 1 is for bot owner/admin
    category: "fun", // category of the command
    prefix: true, // false if the command doesn't need a prefix
    cooldown: 0 // cooldown
  },
  start: async function ({ api, text, react, event, reply }) {
    // Function to get a random Shoti video
    try {
      const response = await axios.get('https://shoti-api.adaptable.app/api/v1/request');
      const videoUrl = response.data.url;

      react("🎥"); // React to the message
      return reply(`Here's a random Shoti video for you: ${videoUrl}`);
    } catch (error) {
      console.error('Error fetching Shoti video:', error);
      return reply('Sorry, I couldn\'t fetch a Shoti video at the moment.');
    }
  },
  auto: async function ({ api, event, text, reply }) {
    // Auto reply function (optional, can be left empty if not needed)
  }
};
