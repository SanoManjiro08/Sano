module.exports = {
  config: {
    name: "greet", // name of the command
    description: "Sends a greeting and a random sticker", // description of the command
    usage: "Just say 'hi' or 'hello'", // usage of the command
    cooldown: 5, // a cooldown for the command
    accessableby: 0, // everyone
    category: "Fun", // category of the command
    prefix: false, // no need for a prefix
  },
  start: async function ({ api, text, react, event, reply }) {
    // Optional: if you want this command to run on manual trigger
  },
  auto: async function ({ api, event, reply }) {
    const messageText = event.body.toLowerCase(); // Convert message to lowercase for easier matching

    // Check if the message contains "hi" or "hello"
    if (messageText === "hi" || messageText === "hello") {
      // Random greeting message
      const greetings = ["Hello!", "Hi there!", "Hey!", "Greetings!", "What's up?"];
      const randomGreeting = greetings[Math.floor(Math.random() * greetings.length)];

      // List of random sticker IDs
      const stickers = [
        "2041015016125972", // Thumbs up sticker ID
        "1747092188935366", // Small heart sticker
        "1747086582269260",
        "2041021609458646", 
        "1757090242268894",
        "1775285296045508",// Big like sticker
      ];
      const randomSticker = stickers[Math.floor(Math.random() * stickers.length)];

      // Send greeting message
      await reply(randomGreeting);

      // Send random sticker
      return api.sendMessage({
        sticker: randomSticker
      }, event.threadID);
    }
  }
}