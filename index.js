const discord = require("discord.js");
const commands = require("./commands.js")

const client = new discord.Client({intents: [
    discord.GatewayIntentBits.DirectMessages,
    discord.GatewayIntentBits.Guilds,
    discord.GatewayIntentBits.GuildBans,
    discord.GatewayIntentBits.GuildMessages,
    discord.GatewayIntentBits.MessageContent,
  ],
  partials: [discord.Partials.Channel],
});
const config = {
  token: process.env.token,
  prefix: "?"
}

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}`)
  client.user.setActivity("your messages", {type: "WATCHING"});
});

client.on("messageCreate", message => {
  if (message.author == client.user) return;
  if (!message.content.startsWith(config.prefix)) return;

  const cmd = message.content.toLowerCase().slice(config.prefix.length).split(" ")[0]
  const args = message.content.trim().split(" ").slice(1);
  
  if (commands.has(cmd)) {
    let callback = commands.get(cmd);
    callback = callback(client, message, args);
    if (!callback) return;
    message.reply(callback);
  } else {
    message.reply("Command doesn't exist!")
  }
});

client.login(config.token);