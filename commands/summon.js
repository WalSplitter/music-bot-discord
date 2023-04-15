const { ChannelType } = require("discord.js");
const { SlashCommandBuilder } = require("@discordjs/builders");
const { joinVoiceChannel } = require("@discordjs/voice");

module.exports = {
	data: new SlashCommandBuilder()
        .setName("summon")
        .setDescription("Summon the bot to the channel.")
        .addChannelOption((option) => option.setName('channel').setDescription('The channel to join').setRequired(true).addChannelTypes(ChannelType.GuildVoice)),
	execute: async ({ client, interaction }) => {
        try {
            const voiceChannel = interaction.options.getChannel('channel');

            const voiceConnection = joinVoiceChannel({
                channelId: voiceChannel.id,
                guildId: interaction.guildId,
                adapterCreator: interaction.guild.voiceAdapterCreator,
            });

            interaction.reply("Lauchboy joined the channel.")
        } catch (error) {
            console.error(error);
            await interaction.reply({content: "There was an error executing this command"});
        }        
	},
}