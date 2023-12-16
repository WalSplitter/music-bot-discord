const { SlashCommandBuilder } = require("@discordjs/builders")
const { EmbedBuilder } = require("discord.js")
const { QueryType } = require("discord-player")

module.exports = {
	data: new SlashCommandBuilder()
		.setName("help")
		.setDescription("Aufzählung aller verfügbaren Kommandos!"),
	execute: async ({ client, interaction }) => {
        // Make sure the user is inside a voice channel
		if (!interaction.member.voice.channel) return interaction.reply("You need to be in a Voice Channel to get help.");

        // Get the current queue
		const lastQueue = client.player.nodes.get(interaction.guildId);

        let queue = null;

        if (lastQueue && lastQueue.isPlaying()) {
            queue = lastQueue;
        } else {
            // Create a play queue for the server		
            //https://discord-player.js.org/docs/guides/migrating#queue-creation-changes
            queue = await client.player.nodes.create(interaction.guild, {
                repeatMode: 1
            }); 
        }               
        
        // Wait until you are connected to the channel
		if (!queue.connection) await queue.connect(interaction.member.voice.channel)
        
        //https://stackoverflow.com/questions/73028854/discord-js-v13-code-breaks-when-upgrading-to-v14
		let embed = new EmbedBuilder();

        try
        {   
            embed
                .setDescription(`Hier eine Auflistung aller Kern Kommandos: '**command**', '**play**', '**ambience**', '**classic**' & '**mood**'`)
                .setFooter({ text: `Für weitere Hilfe, wenden Sie sich an Michael Großhauser...`});

            // Respond with the embed containing information about the player
            await interaction.reply({
                embeds: [embed]
            });
        }
        catch(error)
        {
            console.error(error);
            await interaction.reply({content: "There was an error executing this command"});
        }        
	},
}