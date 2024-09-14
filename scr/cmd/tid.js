module.exports = {
  config: {
    name: "tid", // name of the command
    description: "Retrieve the thread ID of the current chat",
    usage: "{Prefix}tid", // usage of the command
    cooldown: 5, // a cooldown for the command (default is 1 second)
    accessableby: 0, // 0 is for everyone, 1 is for bot owner/admin
    category: "Utility", // category of the command
    prefix: true, // false if the command doesn't need a prefix
    cooldown: 0 // cooldown
  },
  start: async function ({ api, text, react, event, reply }) {
    // This function runs when the command is invoked
    react("🆔"); // React with an ID icon

    // Get the thread ID from the event object
    const threadID = event.threadID;

    // Reply with the thread ID
    return reply(`${threadID}`);
  },
  auto: async function ({ api, event, text, reply }) {
    // auto is for auto reply, but we don't need it for this command
  }
};