const {SlashCommandBuilder} = require("@discordjs/builders");
const { MessageEmbed } = require("discord.js");

module.exports.data = new SlashCommandBuilder()
.setName("ping")
.setDescription("Ping the user and the bot to see how much latency there is");

module.exports.run = (bot,interaction) => {
    //console.log("HIT", interaction)
    var yourping = new Date().getTime() - interaction.createdTimestamp
    var botping = Math.round(bot.ws.ping)
    let embed = new MessageEmbed()
    .setTitle("Pong!")
    .setColor('#0099ff')
    .setDescription(`Your Ping: **${yourping}** \n Bots ping: **${botping}**`)
    interaction.editReply({
        embeds: [embed]
    })
}