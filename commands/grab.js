const { MessageEmbed } = require("discord.js");
const prettyMilliseconds = require("pretty-ms");

module.exports = {
  name: "grab",
  description: "Enregistre la chanson en cours dans vos messages directs",
  usage: "",
  permissions: {
    channel: ["VIEW_CHANNEL", "SEND_MESSAGES", "EMBED_LINKS"],
    member: [],
  },
  aliases: ["save"],
  /**
   *
   * @param {import("../structures/DiscordMusicBot")} client
   * @param {import("discord.js").Message} message
   * @param {string[]} args
   * @param {*} param3
   */
  run: async (client, message, args, { GuildDB }) => {
    let player = await client.Manager.get(message.guild.id);
    if (!player)
      return client.sendTime(
        message.channel,
        "❌ | **Rien ne joue pour le moment...**"
      );
    if (!player.playing)
      return client.sendTime(
        message.channel,
        "❌ | **Rien ne joue pour le moment...**"
      );
    if (!message.member.voice.channel)
      return client.sendTime(
        message.channel,
        "❌ | **Vous devez être dans un canal vocal pour jouer quelque chose !**"
      );
    if (
      message.guild.me.voice.channel &&
      message.member.voice.channel.id !== message.guild.me.voice.channel.id
    )
      return client.sendTime(
        message.channel,
        ":x: | **Vous devez être dans le même canal vocal que moi pour utiliser cette commande !**"
      );
    message.author
      .send(
        new MessageEmbed()
          .setAuthor(
            `Song saved`,
            client.user.displayAvatarURL({
              dynamic: true,
            })
          )
          .setThumbnail(
            `https://img.youtube.com/vi/${player.queue.current.identifier}/mqdefault.jpg`
          )
          .setURL(player.queue.current.uri)
          .setColor(client.botconfig.EmbedColor)
          .setTitle(`**${player.queue.current.title}**`)
          .addField(
            `⌛ Duration: `,
            `\`${prettyMilliseconds(player.queue.current.duration, {
              colonNotation: true,
            })}\``,
            true
          )
          .addField(`🎵 Author: `, `\`${player.queue.current.author}\``, true)
          .addField(
            `▶ Play it:`,
            `\`${
              GuildDB ? GuildDB.prefix : client.botconfig.DefaultPrefix
            }play ${player.queue.current.uri}\``
          )
          .addField(`🔎 Saved in:`, `<#${message.channel.id}>`)
          .setFooter(
            `Demandé par: ${player.queue.current.requester.tag}`,
            player.queue.current.requester.displayAvatarURL({
              dynamic: true,
            })
          )
      )
      .catch((e) => {
        return message.channel.send("**:x: Vos DM sont désactivés**");
      });

    client.sendTime(message.channel, "✅ | **Vérifiez vos DM !**");
  },
  SlashCommand: {
    /**
     *
     * @param {import("../structures/DiscordMusicBot")} client
     * @param {import("discord.js").Message} message
     * @param {string[]} args
     * @param {*} param3
     */
    run: async (client, interaction, args, { GuildDB }) => {
      const guild = client.guilds.cache.get(interaction.guild_id);
      const user = client.users.cache.get(interaction.member.user.id);
      const member = guild.members.cache.get(interaction.member.user.id);
      let player = await client.Manager.get(interaction.guild_id);
      if (!player)
        return client.sendTime(
          interaction,
          "❌ | **Rien ne joue pour le moment...**"
        );
      if (!player.playing)
        return client.sendTime(
          interaction,
          "❌ | **Rien ne joue pour le moment...**"
        );
      if (!member.voice.channel)
        return client.sendTime(
          interaction,
          "❌ | **Vous devez être dans un canal vocal pour utiliser cette commande.**"
        );
      if (
        guild.me.voice.channel &&
        !guild.me.voice.channel.equals(member.voice.channel)
      )
        return client.sendTime(
          interaction,
          ":x: | **Vous devez être dans le même canal vocal que moi pour utiliser cette commande !**"
        );
      try {
        let embed = new MessageEmbed()
          .setAuthor(`Song saved: `, client.user.displayAvatarURL())
          .setThumbnail(
            `https://img.youtube.com/vi/${player.queue.current.identifier}/mqdefault.jpg`
          )
          .setURL(player.queue.current.uri)
          .setColor(client.botconfig.EmbedColor)
          .setTimestamp()
          .setTitle(`**${player.queue.current.title}**`)
          .addField(
            `⌛ Duration: `,
            `\`${prettyMilliseconds(player.queue.current.duration, {
              colonNotation: true,
            })}\``,
            true
          )
          .addField(`🎵 Author: `, `\`${player.queue.current.author}\``, true)
          .addField(
            `▶ Play it:`,
            `\`${
              GuildDB ? GuildDB.prefix : client.botconfig.DefaultPrefix
            }play ${player.queue.current.uri}\``
          )
          .addField(`🔎 Saved in:`, `<#${interaction.channel_id}>`)
          .setFooter(
            `Demandé par: ${player.queue.current.requester.tag}`,
            player.queue.current.requester.displayAvatarURL({
              dynamic: true,
            })
          );
        user.send(embed);
      } catch (e) {
        return client.sendTime(interaction, "**:x: Vos DM sont désactivés**");
      }

      client.sendTime(interaction, "✅ | **Vérifiez vos DM !**");
    },
  },
};
