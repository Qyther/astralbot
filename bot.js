const discord = require("discord.js");
const client = new discord.Client();

client.on("ready", () => {
  console.log("UP! UP! UP! UUP!");
});

client.on("message", msg => {
  if (!msg.member.permissions.has("ADMINISTRATOR")) return;
  if (!msg.content.startsWith("/")) return;


  if (msg.content.toLowerCase().startsWith("/purge")) {
    msg.delete();
    var mc = parseInt(msg.content.split(" ")[1]);
    if(!mc) return msg.reply("Please mention the amount of messages to be deleted");
    if(mc===1)mc=2;
    msg.channel.bulkDelete(mc);
    return;
  }

  if (msg.content.toLowerCase().startsWith("/mute")) {
    msg.delete();
    var player = msg.mentions.members.first();
    if(!player) return msg.reply("Please mention a player");
    player.addRole(msg.guild.roles.find("name", "muted")).then(() => {
      msg.reply(player+" has successfully been muted!");
    }).catch(e => {
      msg.reply("Could not mute "+player);
    });

    return;
  }

  if (msg.content.toLowerCase().startsWith("/unmute")) {
    msg.delete();
    var player = msg.mentions.members.first();
    if(!player) return msg.reply("Please mention a player");
    player.removeRole(msg.guild.roles.find("name", "muted")).then(() => {
      msg.reply(player+" has successfully been unmuted!");
    }).catch(e => {
      msg.reply("Could not unmute "+player);
    });
    return;
  }

  if (msg.content.toLowerCase().startsWith("/togglerole")) {
    msg.delete();
    var player = msg.mentions.members.first();
    var role = msg.content.split(" ")[2];
    if(!player || !role) return msg.reply("Please mention a player and type the name of the role");
    if (!msg.guild.roles.find("name", role)) msg.reply("That role doesn't exist!");
    if (msg.member.roles.some(r=>[role].includes(r.name))) {
      player.removeRole(msg.guild.roles.find("name", role)).then(() => {
        msg.reply("Successfully took "+player+" the "+role+" role!");
      }).catch(e => {
        msg.reply("Could not take "+player+" the "+role+" role")
      });
      return;
    }
    player.addRole(msg.guild.roles.find("name", role)).then(() => {
      msg.reply("Successfully gave "+player+" the "+role+" role!");
    }).catch(e => {
      msg.reply("Could not give "+player+" the "+role+" role")
    });
    return;
  }

  if (msg.content.toLowerCase().startsWith("/ban")) {
    msg.delete();
    var player = msg.mentions.members.first();
    var reason = msg.content.split(" ");
    if (!player || !reason) return msg.reply("Please mention a player and type a reason");
    var reaso = "";
    for (i=0;i<reason.length;i++) {
      if (i >= 2) {
        reaso+=reason[i]+" ";
      }
    }
    if (player.permissions.has("ADMINISTRATOR")) return msg.reply("This person is an administrator");
    player.ban(reaso).then(() => {
      msg.reply("Successfully banned "+player+" for "+reaso);
    }).catch(e => {
      msg.reply("Could not ban "+player);
    });
    return;
  }

  if (msg.content.toLowerCase().startsWith("/unban")) {
    msg.delete();
    var id = msg.content.split(" ")[1];
    try {
    msg.guild.unban(id)
  .then(user => msg.reply("Unbanned " + user.username));
} catch (e) {
  msg.reply("Could not unban "+id);
}
    return;
  }

  if (msg.content.toLowerCase().startsWith("/kick")) {
    msg.delete();
    var player = msg.mentions.members.first();
    var reason = msg.content.split(" ");
    if (!player || !reason) return msg.reply("Please mention a player and type a reason");
    var reaso = "";
    for (i=0;i<reason.length;i++) {
      if (i >= 2) {
        reaso+=reason[i]+" ";
      }
    }
    if (player.permissions.has("ADMINISTRATOR")) return msg.reply("This person is an administrator");
    player.kick(reaso).then(() => {
      msg.reply("Successfully kicked "+player+" for "+reaso);
    }).catch(e => {
      msg.reply("Could not kick "+player);
    });
    return;
  }

});

client.login(process.env.BOT_TOKEN);
