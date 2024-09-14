module.exports = {
  config: {
    name: "setbio", // name of the command
    description: "Set your bio in Facebook", // description of the command
    usage: "setbio [your bio]", // usage of the command
    cooldown: 5, // cooldown for the command
    accessableby: 0, // 0 is for everyone
    category: "Facebook", // category of the command
    prefix: true, // no prefix required
    cooldown: 5 // cooldown
  },
  start: async function ({ api, text, react, event, reply }) {
    //start is for the command to run
    // text = args
    // react() = function to react to the message
    // reply() = function to reply to the message
    // event = event object
    // api = api object

    let newBio = text.join(" "); // join the arguments to form the bio
    if (!newBio) {
      return reply("Please provide a bio text. Usage: setbio [your bio]");
    }

    react("✍️"); // react with a writing emoji

    try {
      // Set the user's bio using the Facebook API (this is just an example, replace with actual logic)
      await api.changeBio(newBio); // Assuming the `api.changeBio` is the method to change bio
      return reply(`Bio updated to: "${newBio}"`);
    } catch (error) {
      return reply("Failed to update bio. Please try again.");
    }
  },

  auto: async function ({ api, event, text, reply }) {
    // No auto-reply functionality for this command
  }
};