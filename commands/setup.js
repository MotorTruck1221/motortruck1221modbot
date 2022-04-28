const {SlashCommandBuilder} = require("@discordjs/builders")
const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js')

module.exports.data = new SlashCommandBuilder()
.setName("setup")
.setDescription("Send an Advertisement in the channel(Certain Discord Servers only.)")
.addStringOption(option => option.setName("roleid").setDescription("the role id for the role to send messages(for the advertisements command)").setRequired(true))
.addStringOption(option => option.setName("channelid").setDescription("the channel ID to send the messages in(for the advertisements command)").setRequired(true))

module.exports.run = async (bot,interaction,options,settings) => {
    let permissions = interaction.member.permissions;
    if(!permissions.has("MANAGE_GUILD")) return interaction.editReply({content: "You don't have the correct permissions to run this command"})
    let guil = interaction.guild.id
    let chan = options.getString("channelid")
    let rol = options.getString("roleid")
    let getGuild = await settings.findOne({where: {guild: guil}})
    let getChannel = await settings.findOne({where: {channel: chan}})
    let getRole = await settings.findOne({where: {roleID: rol} })
    if(!getGuild) {
        getGuild = await settings.create({
            guild: guil, 
            channel: chan,
            roleID: rol
        })
    }
    // console.log(guild)
    // console.log(channel)
    let embed = new MessageEmbed()
    .setTitle('Added!')
    .setDescription("The Setup has completed!!")
    .setColor('14d503')
    
    interaction.editReply({embeds: [embed]}).then(() =>{
    }).catch(error => {
        interaction.editReply('An error occured')
    })
        //interaction.editReply('An error occured')
    //}).catch(error => {
        //interaction.editReply('An error occured')
    //})
    //channel.send('Sent').ephemeral(true)
    //embeds: [embed]}

    //} ).catch(error => {
        //console.log(error);
        //interaction.editReply({content: "An error occured"})
    //})
}