const fs = require('fs');

// Load the blocked users list from block.json
let blockedUsers = [];
const blockFilePath = './block.json';

if (fs.existsSync(blockFilePath)) {
  try {
    blockedUsers = JSON.parse(fs.readFileSync(blockFilePath, 'utf-8'));
  } catch (error) {
    console.error("Error loading block.json:", error.message);
  }
} else {
  fs.writeFileSync(blockFilePath, JSON.stringify([])); // Create the file if it doesn't exist
}

module.exports = {
  config: {
    name: "block", // name of the command
    description: "Block a user from interacting with the bot", // description of the command
    usage: "<user_id>", // usage of the command
    cooldown: 5, // cooldown for the command
    accessableby: 1, // 0 is for everyone, 1 is for bot owner/admin
    category: "Admin", // category of the command
    prefix: true, // requires a prefix
  },
  start: async function ({ text, event, reply }) {
    if (!isAdmin(event.senderID)) {
      return reply("You do not have permission to use this command.");
    }

    if (text.length < 1) {
      return reply("Please provide a valid user ID to block.");
    }

    const userID = text[0];

    // Add the user to the blocked users list and save to block.json
    if (!blockedUsers.includes(userID)) {
      blockedUsers.push(userID);
      saveBlockedUsers();
      return reply(`User with ID ${userID} has been blocked from interacting with the bot.`);
    } else {
      return reply(`User with ID ${userID} is already blocked.`);
    }
  },
};

module.exports.unblock = {
  config: {
    name: "unblock", // name of the command
    description: "Unblock a user to allow them to interact with the bot again", // description of the command
    usage: "<user_id>", // usage of the command
    cooldown: 5, // cooldown for the command
    accessableby: 1, // 0 is for everyone, 1 is for bot owner/admin
    category: "Admin", // category of the command
    prefix: true, // requires a prefix
  },
  start: async function ({ text, event, reply }) {
    if (!isAdmin(event.senderID)) {
      return reply("You do not have permission to use this command.");
    }

    if (text.length < 1) {
      return reply("Please provide a valid user ID to unblock.");
    }

    const userID = text[0];

    // Remove the user from the blocked users list and save to block.json
    const index = blockedUsers.indexOf(userID);
    if (index > -1) {
      blockedUsers.splice(index, 1);
      saveBlockedUsers();
      return reply(`User with ID ${userID} has been unblocked.`);
    } else {
      return reply(`User with ID ${userID} is not blocked.`);
    }
  },
};

// This is a general function that checks if a user is blocked and denies interaction
function checkIfBlocked(userID, reply) {
  if (blockedUsers.includes(userID)) {
    reply("You are blocked from interacting with this bot.");
    return true;
  }
  return false;
}

module.exports.auto = async function ({ event, reply }) {
  // Block any interaction if the user is in the blocked list
  if (checkIfBlocked(event.senderID, reply)) {
    return;
  }

  // Your existing auto-reply functionality can be placed here
};

// Command handler for all commands
module.exports.commandHandler = async function ({ event, commandName, text, reply }) {
  // Prevent command execution if the user is blocked
  if (checkIfBlocked(event.senderID, reply)) {
    return;
  }

  const commandHandlers = {
    autoreply: async function ({ event, text, reply }) { /* handler logic */ },
    war: async function ({ event, text, reply }) { /* handler logic */ },
    acc: async function ({ event, text, reply }) { /* handler logic */ },
    adduser: async function ({ event, text, reply }) { /* handler logic */ },
    admin: async function ({ event, text, reply }) { /* handler logic */ },
    ai: async function ({ event, text, reply }) { /* handler logic */ },
    aigf: async function ({ event, text, reply }) { /* handler logic */ },
    autodl: async function ({ event, text, reply }) { /* handler logic */ },
    bible: async function ({ event, text, reply }) { /* handler logic */ },
    binary: async function ({ event, text, reply }) { /* handler logic */ },
    block: async function ({ event, text, reply }) { /* handler logic */ },
    bot: async function ({ event, text, reply }) { /* handler logic */ },
    cdp: async function ({ event, text, reply }) { /* handler logic */ },
    chart: async function ({ event, text, reply }) { /* handler logic */ },
    clearc: async function ({ event, text, reply }) { /* handler logic */ },
    clown: async function ({ event, text, reply }) { /* handler logic */ },
    confess: async function ({ event, text, reply }) { /* handler logic */ },
    contact: async function ({ event, text, reply }) { /* handler logic */ },
    create: async function ({ event, text, reply }) { /* handler logic */ },
    gen: async function ({ event, text, reply }) { /* handler logic */ },
    gemini: async function ({ event, text, reply }) { /* handler logic */ },
    fsong: async function ({ event, text, reply }) { /* handler logic */ },
    faceswap: async function ({ event, text, reply }) { /* handler logic */ },
    file: async function ({ event, text, reply }) { /* handler logic */ },
    fbcover: async function ({ event, text, reply }) { /* handler logic */ },
    emojipedia: async function ({ event, text, reply }) { /* handler logic */ },
    emix: async function ({ event, text, reply }) { /* handler logic */ },
    emgif: async function ({ event, text, reply }) { /* handler logic */ },
    editimg: async function ({ event, text, reply }) { /* handler logic */ },
    genderize: async function ({ event, text, reply }) { /* handler logic */ },
    help: async function ({ event, text, reply }) { /* handler logic */ },
    upload: async function ({ event, text, reply }) { /* handler logic */ },
    imgur: async function ({ event, text, reply }) { /* handler logic */ },
    insult: async function ({ event, text, reply }) { /* handler logic */ },
    kiss: async function ({ event, text, reply }) { /* handler logic */ },
    link: async function ({ event, text, reply }) { /* handler logic */ },
    llama: async function ({ event, text, reply }) { /* handler logic */ },
    l: async function ({ event, text, reply }) { /* handler logic */ },
    luffy: async function ({ event, text, reply }) { /* handler logic */ },
    maker: async function ({ event, text, reply }) { /* handler logic */ },
    mdreact: async function ({ event, text, reply }) { /* handler logic */ },
    mixtral: async function ({ event, text, reply }) { /* handler logic */ },
    mlhero: async function ({ event, text, reply }) { /* handler logic */ },
    nemo: async function ({ event, text, reply }) { /* handler logic */ },
    ngl: async function ({ event, text, reply }) { /* handler logic */ },
    noti: async function ({ event, text, reply }) { /* handler logic */ },
    out: async function ({ event, text, reply }) { /* handler logic */ },
    pm: async function ({ event, text, reply }) { /* handler logic */ },
    point: async function ({ event, text, reply }) { /* handler logic */ },
    post: async function ({ event, text, reply }) { /* handler logic */ },
    autoPost: async function ({ event, text, reply }) { /* handler logic */ },
    qwen: async function ({ event, text, reply }) { /* handler logic */ },
    restart: async function ({ event, text, reply }) { /* handler logic */ },
    sano: async function ({ event, text, reply }) { /* handler logic */ },
    say: async function ({ event, text, reply }) { /* handler logic */ },
    sdxl: async function ({ event, text, reply }) { /* handler logic */ },
    se: async function ({ event, text, reply }) { /* handler logic */ },
    setbio: async function ({ event, text, reply }) { /* handler logic */ },
    shell: async function ({ event, text, reply }) { /* handler logic */ },
    smsb: async function ({ event, text, reply }) { /* handler logic */ },
    soundc: async function ({ event, text, reply }) { /* handler logic */ },
    spt: async function ({ event, text, reply }) { /* handler logic */ },
    st: async function ({ event, text, reply }) { /* handler logic */ },
    talk: async function ({ event, text, reply }) { /* handler logic */ },
    test: async function ({ event, text, reply }) { /* handler logic */ },
    tid: async function ({ event, text, reply }) { /* handler logic */ },
    trans: async function ({ event, text, reply }) { /* handler logic */ },
    trigger: async function ({ event, text, reply }) { /* handler logic */ },
    uid: async function ({ event, text, reply }) { /* handler logic */ },
    upt: async function ({ event, text, reply }) { /* handler logic */ },
    x: async function ({ event, text, reply }) { /* handler logic */ }
  };

  // Check if the command exists and execute it
  if (commandHandlers[commandName]) {
    await commandHandlers[commandName]({ event, text, reply });
  } else {
    reply("Unknown command.");
  }
};

// Helper function to check if the user is an admin
function isAdmin(userID) {
  const adminIDs = ["61553404918808"]; // Replace with actual admin IDs
  return adminIDs.includes(userID);
}

// Save blocked users to block.json
function saveBlockedUsers() {
  fs.writeFileSync(blockFilePath, JSON.stringify(blockedUsers, null, 2));
}