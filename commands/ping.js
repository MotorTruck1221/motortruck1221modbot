const {SlashCommandBuilder} = require("@discordjs/builders")

module.exports.data = new SlashCommandBuilder()
.setName("ping")
.setDescription("Pingthe user");

module.exports.run = (bot,interaction) => {
    console.log("HIT", interaction)
    interaction.editReply({
        content: "Hello"
    })
}