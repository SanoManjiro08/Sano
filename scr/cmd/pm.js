module.exports = {
  config: {
    name: "pm", // name of the command
    description: "Send a private message to a Facebook user using their UID",
    usage: "{Prefix}pm [uid] | message", // usage of the command
    cooldown: 5, // cooldown time
    accessableby: 0, // 0 is for everyone, 1 is for bot owner/admin
    category: "Messaging", // category of the command
    prefix: true, // false if the command doesn't need a prefix
    cooldown: 0 // cooldown
  },
  start: async function ({ api, text, react, event, reply }) {
    // start is for the command to run
    let [uid, ...messageParts] = text.join(" ").split(" | ");
    if (!uid || messageParts.length === 0) {
      return reply("Usage: {Prefix}pm [uid] | message");
    }

    let message = messageParts.join(" ");
    try {
      react("📤"); // React with an icon indicating message is being sent
      await api.sendMessage(message, uid); // Send the message to the specified UID
      react("✅"); // React with a checkmark indicating success
      return reply(`Message sent to user with UID ${uid}`);
    } catch (err) {
      react("❌"); // React with an error icon
      return reply(`Failed to send message: ${err.message}`);
    }
  },
  auto: async function ({ api, event, text, reply }) {
    // auto is for auto-reply
    if (event.body === "hi") {
      return reply("Hello");
    }
  }
};