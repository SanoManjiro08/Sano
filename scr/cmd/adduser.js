module.exports = {
  config: {
    name: "adduser", // name of the command
    description: "Adds a user to the group chat using their Facebook User ID (UID).",
    usage: "{Prefix}adduser [uid]", // usage of the command
    cooldown: 5, // a cooldown for the command (default is 1 second)
    accessableby: 0, // 0 is for everyone, 1 is for bot owner/admin
    category: "Utility", // category of the command
    prefix: true, // true if the command needs a prefix
    cooldown: 0 // cooldown
  },
  start: async function ({ api, text, react, event, reply }) {
    // Extract the UID from the user's message
    const uid = text[0];

    if (!uid) {
      return reply("Please provide a UID to add a user.");
    }

    try {
      // Add the user to the group using the UID
      await api.addUserToGroup(uid, event.threadID);
      react("✅");
      return reply(`User with UID ${uid} has been added to the group chat.`);
    } catch (error) {
      console.error('[ AddUser ] Error:', error);
      react("❌");
      return reply(`Failed to add user with UID ${uid}. Error: ${error.message}`);
    }
  },
  auto: async function () {
    // No auto functionality required for this command
  }
};