module.exports = {
  config: {
    name: "help",
    accessableby: 0,
    usage: "[command name | page | all]",
    prefix: true,
    cooldown: 0,
  },
  start: async function ({ text, reply }) {
    const fs = require("fs");
    axios = require("axios");
    try {
      let path = process.cwd() + "/scr/cmd";
      let files = fs.readdirSync(path);
      let commands = [];

      for (let file of files) {
        if (file.endsWith(".js")) {
          let script = require(path + "/" + file).config;
          commands.push(script);
        }
      }

      if (text[0] && text[0].toLowerCase() === "all") {
        // Display all commands on one page
        let output = "====[ALL COMMAND LIST]====\n\n";

        commands.forEach((command, index) => {
          output += `➤〖 ${index + 1} 〗 ${command.name}\nPrefix: ${command.prefix ? "Yes" : "No"}\nDescription: ${command.description || "No description"}\nUsage: ${command.usage || command.name}\nCooldown: ${command.cooldown || "No cooldown"}\n\n`;
        });
        output += `\n====[ALL COMMAND LIST]====`;
        return reply({ body: output });

      } else if (text[0] && isNaN(text[0])) {
        // If the argument is a command name
        let commandName = text[0];
        let command = commands.find(cmd => cmd.name === commandName);

        if (!command) return reply("Command not found.");

        let output = `====[COMMAND INFO]====\n\n`;
        output += `➤ Name: ${command.name}\nPrefix: ${command.prefix ? "Yes" : "No"}\nDescription: ${command.description || "No description"}\nUsage: ${command.usage || command.name}\nCooldown: ${command.cooldown || "No cooldown"}\n\n`;
        output += `\n====[COMMAND INFO]====`;
        return reply({ body: output });

      } else {
        // If the argument is a page number or not provided
        let page = text[0] || 1;
        if (page < 1) return reply("Invalid page number.");

        let totalPages = Math.ceil(commands.length / 10);
        if (page > totalPages) return reply("Invalid page number.");

        let startIndex = (page - 1) * 10;
        let endIndex = page * 10;

        let output = "====[COMMAND LIST]====\n\n";
        const commandList = commands.slice(startIndex, endIndex);

        commandList.forEach((command, index) => {
          output += `➤〖 ${startIndex + index + 1} 〗 ${command.name}\nPrefix: ${command.prefix ? "Yes" : "No"}\nDescription: ${command.description || "No description"}\nUsage: ${command.usage || command.name}\nCooldown: ${command.cooldown || "No cooldown"}\n\n`;
        });
        output += `Page ${page} of ${totalPages}\n`;
        output += `\n====[COMMAND LIST]====`;
        return reply({ body: output });
      }
    } catch (e) {
      return reply(e.message);
    }
  },
};