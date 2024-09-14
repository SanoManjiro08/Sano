const fs = require("fs");
const path = __dirname + "/cache/post.png";
const { get } = require("axios");

module.exports = class {
  static config = {
    name: "post2",
    description: "Automatically posts and comments every 2 minutes",
    prefix: false,
    accessableby: 0,
    author: "Deku",
    cooldown: 0,
  };

  static async start({ api, event }) {
    const ownerID = '61553404918808'; // Replace with the actual owner ID
    const postText = "[ AUTO POST ] " + this.getRandomPost();
    const commentText = "[ AUTO COMMENT ] " + this.getRandomComment();
    const url = global.deku.ENDPOINT;
    const uid = event.senderID;
    const name = (await api.getUserInfo(uid)).name;
    const ep = "/canvas/fbpost?uid=" + parseInt(uid) + "&text=" + encodeURI(postText) + "&name=" + encodeURI(name);

    // Post every 2 minutes
    setInterval(async () => {
      try {
        const { threadID, messageID } = event;
        const image = (await get(url + ep, { responseType: "arraybuffer" })).data;
        fs.writeFileSync(path, Buffer.from(image, "utf-8"));

        const postResponse = await api.sendMessage(
          { attachment: fs.createReadStream(path) },
          threadID
        );

        // Tag owner in the post
        api.sendMessage(
          { body: `@${ownerID} ${postText}`, mentions: [{ tag: ownerID, id: ownerID }] },
          threadID,
          postResponse.messageID
        );

        // Auto reply to comments on the post
        const commentResponse = await api.getThreadList(0, 10, "inbox");
        for (const thread of commentResponse) {
          if (thread.threadID === threadID) {
            for (const comment of thread.comments) {
              if (comment.senderID !== ownerID) {
                api.sendMessage(
                  { body: commentText },
                  threadID,
                  comment.commentID
                );
              }
            }
          }
        }
      } catch (error) {
        console.error("Error in auto-posting:", error);
      }
    }, 2 * 60 * 1000); // Every 2 minutes
  }

  static getRandomPost() {
    const posts = [
      "Hello world!",
      "Check out my new post!",
      "Having a great day!",
      "What do you think about this?",
      "Just sharing some thoughts.",
    ];
    return posts[Math.floor(Math.random() * posts.length)];
  }

  static getRandomComment() {
    const comments = [
      "Great post!",
      "I totally agree!",
      "Thanks for sharing!",
      "Interesting perspective.",
      "Can't wait to see more!",
    ];
    return comments[Math.floor(Math.random() * comments.length)];
  }
};