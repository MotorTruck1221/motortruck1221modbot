const {SlashCommandBuilder} = require("@discordjs/builders")
const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js')
const { token } = require('../config.js');

module.exports.data = new SlashCommandBuilder()
.setName("status")
.setDescription("Set the status and Game of the Bot")
.addStringOption(option => option.setName("status").setDescription("options are: PLAYING, WATCHING, STREAMING(must type in all caps)").setRequired(true))
.addStringOption(option => option.setName("game").setDescription("status of the bot: e.g Hi!").setRequired(true))

module.exports.run = async (Bot,interaction,options,settings,owner) => {
    //let guil = interaction.guild.id
    //let getGuild = await settings.findOne({where: {guild: guil}})
    //let permissions = interaction.member.permissions;
    const message = await interaction.fetchReply()
    //console.log(message)
    const mID = message.interaction.user.id
    //console.log(mID)
    if (mID !== '818995901791207454')  return interaction.editReply({content: "You are Not The Discord Bot's Owner!"})
    //let reason = options.getString("reason");
    //971908247172816897
    let stat = options.getString("status")
    let sta = stat.toUpperCase()
    let status = await owner.findOne({where: {oID: mID}})
    //console.log(status)
    let gam = options.getString("game")
    if (status) {
        status = await owner.destroy({ where: { oID: mID } });
        //console.log(status)
        status = await owner.create({
            oID: mID,
            status: sta,
            game: gam
        })
    } else {
        status = await owner.create({
            oID: mID,
            status: sta,
            game: gam
        }) 
    }
    Bot.user.setActivity(`${gam}`, { type: `${sta}` })
    let embed = new MessageEmbed()
    .setTitle(`Changed!`)
    //.setDescription("If you would like to mute for a longer time please use /mute \n ----------- \n **NOTE: DO NOT CLICK THE SAME BUTTON \n PLEASE TYPE /manage AGAIN**")
    .setColor('ff340d')
    .addFields(
        { name: 'Set The status to:', value: `${sta}` },
        { name: 'Set the Game to:', value: `${gam}` }
    )
    // .setThumbnail(`${image}`)
    // .setFooter('To advertise your own server type /advertise')
    // bot.channels.fetch(`${channel}`)
    interaction.editReply({
        embeds: [embed]
    })
}
