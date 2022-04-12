//OTYyODE3MjA5MTcwNzk2NTg0.YlNDZg.RpyqUS6_IguJIRYoohqee9zruEc 
const { memberNicknameMention } = require('@discordjs/builders');
const Discord = require('discord.js');
const Bot = new Discord.Client({intents: [Discord.Intents.FLAGS.GUILD_MEMBERS, Discord.Intents.FLAGS.GUILDS, Discord.Intents.FLAGS.DIRECT_MESSAGES]});
const { token } = require('./config.js');
require("./slash-register")();
let commands = require("./slash-register").commands;

Bot.on('ready', () => {
    console.log("Bot is online!")
    let commands = Bot.application.commands;
})

Bot.on('interactionCreate', async interaction => {
    if(!interaction.isCommand()) return;
    let name = interaction.commandName;
    let options = interaction.options;

    let commandMethod  = commands.get(name);
    if(!commandMethod) return;
    await interaction.deferReply();
    commandMethod(Bot, interaction, options)
})

Bot.login(token)