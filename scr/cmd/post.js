module.exports = {
  config: {
    name: "post", // name of the command
    description: "Create a Facebook post with privacy options", // description of the command
    usage: "post", // usage of the command
    cooldown: 5, // cooldown for the command
    accessableby: 0, // 0 is for everyone
    category: "Facebook", // category of the command
    prefix: false, // no prefix required
  },

  start: async function ({ api, text, react, event, reply }) {
    // Start command to post on Facebook
    react("✍️"); // Initial reaction when the command starts

    // Ask for privacy setting
    await reply("Choose privacy of the post:\n1. Everyone\n2. Friends\n3. Only me");

    let privacy = await getResponse(event);

    if (!["1", "2", "3"].includes(privacy)) {
      return reply("Invalid choice. Please reply with 1, 2, or 3.");
    }

    // Map privacy option to Facebook privacy settings
    let privacySetting;
    switch (privacy) {
      case "1":
        privacySetting = "EVERYONE";
        break;
      case "2":
        privacySetting = "FRIENDS";
        break;
      case "3":
        privacySetting = "ONLY_ME";
        break;
    }

    // Ask for post photo
    await reply("Reply to this message with your post photo, or reply '0' if there is no photo.");

    let photoResponse = await getResponse(event);
    let photo = photoResponse === "0" ? null : photoResponse; // Check if the user provided a photo or "0"

    // Ask for post text
    await reply("Reply to this message with your post text, or reply '0' if there is no text.");

    let textResponse = await getResponse(event);
    let postText = textResponse === "0" ? null : textResponse; // Check if the user provided text or "0"

    // Handle the Facebook post
    try {
      let postResult = await api.createPost({
        privacy: privacySetting,
        photo: photo || undefined,
        text: postText || undefined,
      });

      if (postResult.success) {
        return reply("Post was successfully created!");
      } else {
        return reply("Failed to create the post. Please try again.");
      }
    } catch (error) {
      return reply("An error occurred while posting. Please try again.");
    }
  },

  auto: async function ({ api, event, text, reply }) {
    // No auto-reply functionality for this command
  },
};

// Helper function to get user response after asking a question
async function getResponse(event) {
  return new Promise((resolve) => {
    const handleReply = (responseEvent) => {
      if (responseEvent.senderID === event.senderID) {
        resolve(responseEvent.body);
        event.removeListener("message", handleReply);
      }
    };
    event.on("message", handleReply);
  });
}
