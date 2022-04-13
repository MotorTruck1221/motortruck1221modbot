const {SlashCommandBuilder} = require("@discordjs/builders")
const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js')

module.exports.data = new SlashCommandBuilder()
.setName("ban")
.setDescription("ban the user provided")
.addUserOption(option => option.setName("person").setDescription("the person to ban").setRequired(true))
.addStringOption(option => option.setName("reason").setDescription("the reason for banning the user"))

module.exports.run = (bot,interaction,options) => {
    let permissions = interaction.member.permissions;
    if(!permissions.has("MANAGE_GUILD")) return interaction.editReply({content: "You don't have the correct permissions to run this command"})
    
    let member = options.getMember("person");
    let reason = options.getString("reason")
    if(!member) return interaction.editReply({content: "Meber does not exist or Member was not provided."})
    if(!reason) reason = "N/A"
    if(!days) days = "7"
    member.ban({reason: reason, days: 7}).then( () => {
        if(reason == "N/A") interaction.editReply({content: `User ${member.displayname} was succesfully kicked`})
        interaction.editReply({content: `User ${member.displayname} was succesfully kicked for **${reason}**`})

    } ).catch(error => {
        console.log(error);
        interaction.editReply({content: "An error occured"})
    })
}