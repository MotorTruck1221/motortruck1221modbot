const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const { token } = require('./config.js');
const fs = require('node:fs');
const commands = [];
const commandList = new Map();

module.exports = () => {
    const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

    // Place your client and guild ids here
    const clientId = '962817209170796584';
    const guildId = '962817113624571974';

    for (const file of commandFiles) {
    	const command = require(`./commands/${file}`);
    	commands.push(command.data.toJSON());
        commandList.set(command.data.name, command.run)
    }

    const rest = new REST({ version: '9' }).setToken(token);
    (async () => {
        try {
            console.log('Started refreshing application (/) commands.');
        
            // await rest.put(
            //     Routes.applicationCommands(clientId),
            //     { body: commands },
            // );   
            
            await rest.put(
                Routes.applicationGuildCommands(clientId, guildId),
                { body: commands },
            );
        
                console.log('Successfully reloaded application (/) commands.');
        } catch (error) {
            console.error(error);
        }
    })();
}




module.exports.commands = commandList;