const {SlashCommandBuilder} = require("@discordjs/builders")
const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js')

module.exports.data = new SlashCommandBuilder()
.setName("mute")
.setDescription("mute the user provided")
.addUserOption(option => option.setName("person").setDescription("the person to mute").setRequired(true))
.addStringOption(option => option.setName("time").setDescription("The Amount of time you want to mute a user (in minutes)").setRequired(true))
.addStringOption(option => option.setName("reason").setDescription("the reason you muted the user"))

module.exports.run = (bot,interaction,options) => {
    let permissions = interaction.member.permissions;
    if(!permissions.has("TIMEOUT_MEMBERS")) return interaction.editReply({content: "You don't have the correct permissions to run this command"})
    
    let member = options.getMember("person");
    let reason = options.getString("reason");
    let time = options.getString("time");
    var timei = parseInt(time);
    // Embed
    let embed = new MessageEmbed()
    .setTitle(`User ${member.user.username} was succesfully timed out for **${reason}** \n Time: ${timei}minutes`)
    //.setDescription("If you would like to mute for a longer time please use /mute \n ----------- \n **NOTE: DO NOT CLICK THE SAME BUTTON \n PLEASE TYPE /manage AGAIN**")
    .setColor('#0099ff')
    // End EMBED
    if(!member) return interaction.editReply({content: "Member does not exist or Member was not provided."})
    //if(!reason) reason = "N/A"
    member.timeout(timei * 60 * 1000, reason).then( () => {
        //if(reason == "N/A") interaction.editReply({content: `User ${member.user.username} was succesfully timed out`})
        interaction.editReply({embeds: [embed]})

    } ).catch(error => {
        console.log(error);
        interaction.editReply({content: "An error occured"})
    })
}