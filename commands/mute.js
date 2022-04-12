const {SlashCommandBuilder} = require("@discordjs/builders")

module.exports.data = new SlashCommandBuilder()
.setName("mute")
.setDescription("mute the user provided")
.addUserOption(option => option.setName("person").setDescription("the person to mute").setRequired(true))
.addStringOption(option => option.setName("time").setDescription("The Amount of time you want to mute a user (in minutes)").setRequired(true))
.addStringOption(option => option.setName("reason").setDescription("the reason you muted the user"))

module.exports.run = (bot,interaction,options) => {
    let permissions = interaction.member.permissions;
    if(!permissions.has("MANAGE_MESSAGES")) return interaction.editReply({content: "You don't have the correct permissions to run this command"})
    
    let member = options.getMember("person");
    let reason = options.getString("reason");
    let time = options.getString("time");
    var timei = parseInt(time);
    if(!member) return interaction.editReply({content: "Member does not exist or Member was not provided."})
    if(!reason) reason = "N/A"
    member.timeout(timei * 60 * 1000, reason).then( () => {
        if(reason == "N/A") interaction.editReply({content: `User ${member.displayname} was succesfully timed out`})
        interaction.editReply({content: `User ${member.displayname} was succesfully timed out for **${reason}**`})

    } ).catch(error => {
        console.log(error);
        interaction.editReply({content: "An error occured"})
    })
}