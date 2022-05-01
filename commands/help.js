const {SlashCommandBuilder} = require("@discordjs/builders")
const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js')

module.exports.data = new SlashCommandBuilder()
.setName("help")
.setDescription("see commands for bot")
// .addUserOption(option => option.setName("person").setDescription("the person to kick").setRequired(true));

module.exports.run = (bot,interaction,options) => {
    // let permissions = interaction.member.permissions;
    // if(!permissions.has("MANAGE_MESSAGES")) return interaction.editReply({content: "You don't have the correct permissions to run this command"})
    
    // let member = options.getMember("person");
    // if(!member) return interaction.editReply({content: "Meber does not exist or Member was not provided."})

    let embed = new MessageEmbed()
    .setTitle(`Help`)
    .setDescription(`Help for the bot \n Note: The documentation and buttons are currently being worked on`)
    .setColor('ff340d')

    const row = new MessageActionRow()
    .addComponents(
        new MessageButton()
        .setLabel("Help")
        .setStyle("LINK")
        .setURL("https://unblockedhaven.cf")
        .setDisabled(true)
    )

    return interaction.editReply({
        embeds: [embed],
        components: [row]
    })
}
