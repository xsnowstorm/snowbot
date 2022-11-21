const commands = new Map();


commands.set("ping", (client, message, args) => {
  message.reply(`Pong! Delay is ${Date.now() - message.createdTimestamp}ms.`);
  return;
});

commands.set("say", (client, message, args) => {
  const msg = args.join("");
  if (msg.includes("@")) return "Can't include mentions!";
  return msg;
});


module.exports = commands;