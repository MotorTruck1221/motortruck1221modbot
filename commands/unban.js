const {SlashCommandBuilder} = require("@discordjs/builders")
const { Permissions, MessageEmbed, MessageActionRow, MessageButton } = require('discord.js')

module.exports.data = new SlashCommandBuilder()
.setName("unban")
.setDescription("unban the user id provided")
.addStringOption(option => option.setName("person").setDescription("the person to unban").setRequired(true))
//.addStringOption(option => option.setName("reason").setDescription("the reason for banning the user"))
//permission: Permissions.FLAGS.Ban_members

module.exports.run = (bot,interaction,options)  => {
    let permissions = interaction.member.permissions;
    if(!permissions.has("MANAGE_GUILD")) return interaction.editReply({content: "You don't have the correct permissions to run this command"})
    
    let member = options.getString("person");
    let reason = options.getString("reason");
    let embed = new MessageEmbed()
    .setTitle(`User ${member} was succesfully unbanned`)
    //.setDescription("If you would like to mute for a longer time please use /mute \n ----------- \n **NOTE: DO NOT CLICK THE SAME BUTTON \n PLEASE TYPE /manage AGAIN**")
    .setColor('#0099ff')
    if(!member) return interaction.editReply({content: "Member does not exist or Member was not provided."})
    //if(!reason) reason = "N/A"
    //if(!days) days = "7"
    interaction.guild.members.unban(member).then( () => {
        //if(reason == "N/A") interaction.editReply({content: `User ${member.displayname} was succesfully kicked`})
        interaction.editReply({embeds: [embed]})

    } ).catch(error => {
        console.log(error);
        interaction.editReply({content: "An error occured"})
    })
}