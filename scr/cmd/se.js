const emojis = [
  "😀", "😁", "😂", "🤣", "😃", "😄", "😅", "😆", "😇", "😈", 
  "😉", "😊", "😋", "😎", "😍", "😘", "🥰", "😜", "😝", "😛", 
  "🤑", "🤗", "🤔", "🤐", "🤨", "😐", "😑", "😶", "🙄", "😏", 
  "😣", "😥", "😮", "🤐", "😯", "😪", "😫", "😴", "🥱", "😵", 
  "😵‍💫", "🤯", "🤠", "🥳", "😎", "🤓", "🧐", "😕", "😟", "🙁", 
  "☹️", "😮‍💨", "😧", "😦", "😰", "😥", "😓", "🤗", "🤔", "🤨", 
  "😠", "😡", "🤬", "😈", "👿", "💀", "☠️", "🤡", "👹", "👺", 
  "👻", "👽", "💩", "🤖", "🎃", "👹", "👺", "💩", "🤑", "🤗"
];

let interval;

module.exports = {
  config: {
    name: "se", // name of the command
    description: "Automatically sends a random emoji every minute", // description of the command
    usage: "se [start/stop]", // usage of the command
    cooldown: 5, // cooldown for the command
    accessableby: 0, // accessible by everyone
    category: "fun", // category of the command
    prefix: true // requires a prefix
  },
  start: async function ({ api, text, react, event, reply }) {
    const command = text[0]?.toLowerCase();

    if (command === 'start') {
      // Start sending random emojis every 1 minute
      if (interval) {
        return reply("Emoji sending is already running.");
      }
      interval = setInterval(() => {
        const randomEmoji = emojis[Math.floor(Math.random() * emojis.length)];
        api.sendMessage(randomEmoji, event.threadID);
      }, 60000); // 1 minute interval
      return reply("Started sending random emojis every minute.");
    }

    if (command === 'stop') {
      // Stop sending random emojis
      if (!interval) {
        return reply("Emoji sending is not running.");
      }
      clearInterval(interval);
      interval = null;
      return reply("Stopped sending random emojis.");
    }

    return reply("Usage: `!se start` to begin sending emojis, `!se stop` to stop.");
  },
  auto: async function ({ api, event, text, reply }) {
    // auto is not used in this command
  }
};