module.exports = {
  config: {
    name: "autoreply", // name of the command
    description: "Auto-reply based on specific messages", // description of the command
    usage: "<message>", // usage of the command
    cooldown: 5, // cooldown for the command
    accessableby: 0, // 0 is for everyone
    category: "Auto-reply", // category of the command
    prefix: true, // requires a prefix
  },
  start: async function ({ api, text, react, event, reply }) {
    // Start function when the command is triggered manually
    let userMessage = text.join(" ");
    react("🤖");

    // Echo back the user's message (this can be changed based on logic)
    return reply(`You said: ${userMessage}`);
  },
  auto: async function ({ api, event, text, reply }) {
    // Auto-reply function based on the message content
    const messageContent = event.body.toLowerCase();

    // Define auto-reply behavior based on keywords or exact phrases
    if (messageContent.includes("hentai")) {
      return reply("+1 tigang points");
    } else if (messageContent.includes("bold")) {
      return reply("namamayat kana");
    } else if (messageContent.includes("rr")) { // Fixed the capitalization
      return reply("Tigang ang person");
    } else {
      // No reply if message doesn't match any condition
      return;
    }
  }
};