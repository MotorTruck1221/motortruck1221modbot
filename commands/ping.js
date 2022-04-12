const {SlashCommandBuilder} = require("@discordjs/builders")

module.exports.data = new SlashCommandBuilder()
.setName("ping")
.setDescription("Ping the user");

module.exports.run = (bot,interaction) => {
    //console.log("HIT", interaction)
    interaction.editReply({
        content: "Pong!"
    })
}