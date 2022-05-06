//OTYyODE3MjA5MTcwNzk2NTg0.YlNDZg.RpyqUS6_IguJIRYoohqee9zruEc 
const { memberNicknameMention } = require('@discordjs/builders');
const Discord = require('discord.js');
const Bot = new Discord.Client({intents: [Discord.Intents.FLAGS.GUILD_MEMBERS, Discord.Intents.FLAGS.GUILDS, Discord.Intents.FLAGS.DIRECT_MESSAGES]});
const { token } = require('./config.js');
require("./slash-register")();
let commands = require("./slash-register").commands;
const {settings} = require("./advertisedb.js")
const {owner} = require("./ownerOnly.js")
const wID = '818995901791207454'



Bot.on('ready', async () => {
    settings.sync();
    owner.sync();
    const pp = await owner.findOne({where: {oID: wID}})
    stat = (pp.status)
    gam = (pp.game)
    console.log("Bot is online!")
    let commands = Bot.application.commands;
    Bot.user.setActivity(`${gam}`, { type: `${stat}` })
})

Bot.on('interactionCreate', async interaction => {
    await interaction.deferReply();
    if(interaction.isCommand()){
        let name = interaction.commandName;
        let options = interaction.options;
        let commandMethod  = commands.get(name);
        if(!commandMethod) return;
        commandMethod.run(Bot, interaction, options, settings, owner)
    } else if (interaction.isButton()){
        let button_id = interaction.customId;
        // button_id = ban-1234567
        // ["ban", "1234567"]
        let [command, action, id] = button_id.split("-");
        let guild = interaction.guild;
        let member = guild.members.cache.get(id);

        let buttonCallback = commands.get(command);
        if(!buttonCallback) return;

        buttonCallback.button(Bot,interaction,member,action)
        // if(command == "ban") {
        //     member.ban();
        //     return interaction.editReply({
        //         content: `Sucessfully banned ${member}`,
        //         ephmeral: true
        //     })
        // } else if(command == "kick"){
        //     member.kick();
        //     return interaction.editReply({
        //         content: `Sucessfully kicked ${member}`,
        //         ephmeral: true
        //     })
        }
    })

Bot.login(token)