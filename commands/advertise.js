const {SlashCommandBuilder} = require("@discordjs/builders")
const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js')

module.exports.data = new SlashCommandBuilder()
.setName("advertise")
.setDescription("Send an Advertisement in the channel(Certain Discord Servers only.)")
.addStringOption(option => option.setName("title").setDescription("the title of the advertisment").setRequired(true))
.addStringOption(option => option.setName("description").setDescription("the description of the advertisement").setRequired(true))
.addStringOption(option => option.setName("invite").setDescription("the link to the server").setRequired(true))
.addStringOption(option => option.setName("image").setDescription("An image to send.(URL only)").setRequired(true))

module.exports.run = async (bot,interaction,options,settings) => {
    let guil = interaction.guild.id
    let getGuild = await settings.findOne({where: {guild: guil}})
    //let permissions = interaction.member.permissions;
    if(!interaction.member.roles.cache.has(`${getGuild.roleID}`)) return interaction.editReply({content: "You don't have the correct permissions to run this command"})
    //let reason = options.getString("reason");
    let title = options.getString("title")
    let description = options.getString("description")
    let invite = options.getString("invite")
    let image = options.getString("image")
    let channel = getGuild.channel
    //console.log(getGuild)
    //if(!invite.has('https://')) return interaction.editReply('That is not a URL!')
    //if(invite == 'http://') return interaction.editReply('Only https:// urls!')
    //if(!invite.has('https://discord.gg/')) return interaction.editReply('Only Discord Invites!')
    //if(!image.has('https://')) return interaction.editReply('That is not a URL!')
    //if(image == "https://discord.com/") return interaction.editReply('Please use public images!')
    //if(image == "https://discord.gg/") return interaction.editReply('Please use public images!')
    //if(image == "https://discord.com") return interaction.editReply('Please use public images!')
    //if(image == "https://discord.gg") return interaction.editReply('Please use public images!')
    let embed = new MessageEmbed()
    .setTitle(`${title}`)
    //.setDescription("If you would like to mute for a longer time please use /mute \n ----------- \n **NOTE: DO NOT CLICK THE SAME BUTTON \n PLEASE TYPE /manage AGAIN**")
    .setColor('ff340d')
    .addFields(
        { name: 'Description', value: `${description}` },
        { name: 'Server Invite', value: `[Server Invite](${invite})` }
    )
    .setThumbnail(`${image}`)
    .setFooter('To advertise your own server type /advertise')
    bot.channels.fetch(`${channel}`)
    bot.channels.cache.get(`${channel}`).send({embeds: [embed]}).then(() => {
        interaction.editReply('Sent!')
    }).catch(error => {
        console.log(error)
        interaction.editReply('An error occured')
    })
    //channel.send('Sent').ephemeral(true)
    //embeds: [embed]}

    //} ).catch(error => {
        //console.log(error);
        //interaction.editReply({content: "An error occured"})
    //})
}
