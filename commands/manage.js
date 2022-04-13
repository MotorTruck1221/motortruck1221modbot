const {SlashCommandBuilder} = require("@discordjs/builders")
const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js')

module.exports.data = new SlashCommandBuilder()
.setName("manage")
.setDescription("manage the user provided")
.addUserOption(option => option.setName("person").setDescription("the person to kick").setRequired(true));

module.exports.run = (bot,interaction,options) => {
    let permissions = interaction.member.permissions;
    if(!permissions.has("MANAGE_MESSAGES")) return interaction.editReply({content: "You don't have the correct permissions to run this command"})
    
    let member = options.getMember("person");
    if(!member) return interaction.editReply({content: "Meber does not exist or Member was not provided."})

    let embed = new MessageEmbed()
    .setTitle(`Manage ${member.user.username}`)
    .setDescription("Click one of the buttons below to manage a user")
    .setColor('#0099ff')

    const row = new MessageActionRow()
    .addComponents(
        [new MessageButton()
        .setLabel("Ban")
        .setStyle("DANGER")
        .setCustomId(`manage-ban-${member.id}`),

        new MessageButton()
        .setLabel("Kick")
        .setStyle("PRIMARY")
        .setCustomId(`manage-kick-${member.id}`),

        new MessageButton()
        .setLabel("Mute")
        .setStyle("SECONDARY")
        .setCustomId(`manage-timeout-${member.id}`)]
    )

    return interaction.editReply({
        embeds: [embed],
        components: [row]
    })
}
module.exports.button = (bot, interaction, member, action) => {
    let permissions = interaction.member.permissions;
    if(action == "ban") {
        if(!permissions.has("MANAGE_GUILD")) return interaction.editReply({content: "You don't have the correct permissions to run this command"})
        member.ban();
        return interaction.editReply({
            content: `Sucessfully banned ${member}`,
            ephmeral: true
        })
    } else if(action == "kick"){
        member.kick();
        return interaction.editReply({
            content: `Sucessfully kicked ${member}`,
            ephmeral: true
        })
    } else if(action == "timeout"){
        member.timeout(5 * 60 * 1000);
        return interaction.editReply({
            content: `Sucessfully muted ${member}`,
            ephmeral: true
    })
  }
}