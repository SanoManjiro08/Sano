module.exports = {
  config: {
    name: "note", // name of the command
    description: "Adds or leaves a new note", // description of the command
    usage: "!note [note idea]", // usage of the command
    cooldown: 5, // a cooldown for the command (default is 1 second)
    accessableby: 0, // 0 is for everyone, 1 is for bot owner/admin
    category: "misc", // category of the command
    prefix: true, // false if the command doesn't need a prefix
    cooldown: 0 // cooldown
  },
  start: async function ({ api, text, react, event, reply }) {
    //start is for the command to run
    // text = args
    // react() = function to react to the message
    //reply() = function to reply to the message
    // event = event object
    // api = api object
    // example code
    let userMessage = text.join(" ");
    if (userMessage === "") {
      return reply("Please provide a note to add or leave.");
    }
    react("📝");
    return reply(`Note ${userMessage} added!`);
  },
  auto: async function ({ api, event, text, reply }) {
    // auto is for auto reply
    // text = args
    // react() = function to react to the message
    //reply() = function to reply to the message
    // event = event object
    // api = api object
    // example code
    if (event.body == "hi") {
      return reply("Hello")
    }
  }
}
