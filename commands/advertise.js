const {SlashCommandBuilder} = require("@discordjs/builders")
const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js')

module.exports.data = new SlashCommandBuilder()
.setName("advertise")
.setDescription("Send an Advertisement in the channel(Certain Discord Servers only.)")
.addStringOption(option => option.setName("title").setDescription("the title of the advertisment").setRequired(true))
.addStringOption(option => option.setName("description").setDescription("the description of the advertisement").setRequired(true))
.addStringOption(option => option.setName("invite").setDescription("the link to the server").setRequired(true))
//.addStringOption(option => option.setName("An optional image").setDescription("An optional image to send.(URL only)"))

module.exports.run = (bot,interaction,options) => {
    //let permissions = interaction.member.permissions;
    if(!interaction.member.roles.cache.has('969013811912769577')) return interaction.editReply({content: "You don't have the correct permissions to run this command"})
    //let reason = options.getString("reason");
    let title = options.getString("title")
    let description = options.getString("description")
    let invite = options.getString("invite")
    if(invite != 'https://') return interaction.editReply('That is not a URL!')
    if(invite == 'http://') return interaction.editReply('Only https:// urls!')
    if(invite != 'https://discord.gg/') return interaction.editReply('Only Discord Invites!')
    let embed = new MessageEmbed()
    .setTitle(`${title}`)
    //.setDescription("If you would like to mute for a longer time please use /mute \n ----------- \n **NOTE: DO NOT CLICK THE SAME BUTTON \n PLEASE TYPE /manage AGAIN**")
    //.setColor('#0099ff')
    .addFields(
        { name: 'Description', value: `${description}` },
        { name: 'Server Invite', value: `[Server Invite](${invite})` }
    )
    bot.channels.cache.get('967641094403801138').send({embeds: [embed]}).then(() => {
        interaction.editReply('An error occured')
    })
    interaction.editReply('Sent!')
    //embeds: [embed]}

    //} ).catch(error => {
        //console.log(error);
        //interaction.editReply({content: "An error occured"})
    //})
}