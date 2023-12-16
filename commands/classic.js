const { SlashCommandBuilder } = require("@discordjs/builders")
const { EmbedBuilder } = require("discord.js")
const { QueryType } = require("discord-player")

module.exports = {
	data: new SlashCommandBuilder()
		.setName("classic")
		.setDescription("Festgelegte Soundtracks für DnD!")
		.addSubcommand(subcommand =>
			subcommand
				.setName("lacrimosa")
				.setDescription("Spielt Mozart - Lacrimosa (3:20) ab.")				
		)
		.addSubcommand(subcommand =>
			subcommand
				.setName("dies-irae")
				.setDescription("Spielt Verdi's Requiem II. Dies Irae (2:14) ab.")				
		),
	execute: async ({ client, interaction }) => {
        // Make sure the user is inside a voice channel
		if (!interaction.member.voice.channel) return interaction.reply("You need to be in a Voice Channel to play a song.");

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

        const currentSong = queue.currentTrack;

        if(currentSong) {            
            await queue.removeTrack(currentSong);
        }
        
        // Wait until you are connected to the channel
		if (!queue.connection) await queue.connect(interaction.member.voice.channel)
        
        //https://stackoverflow.com/questions/73028854/discord-js-v13-code-breaks-when-upgrading-to-v14
		let embed = new EmbedBuilder();
        
        const soundTrackUrlList = {
			'lacrimosa': 'https://www.youtube.com/watch?v=k1-TrAvp_xs',
			'dies-irae': 'https://www.youtube.com/watch?v=CUGMZlvrR4c'
        };

        let url = soundTrackUrlList[interaction.options.getSubcommand()];

        if (!url) {
            //eduard laser theme
            url = 'https://www.youtube.com/watch?v=DtkLQfYY-iM'
        }

        try
        {   
            // Search for the song using the discord-player
            const result = await client.player.search(url, {
                requestedBy: interaction.user,
                searchEngine: QueryType.AUTO
            })
            // finish if no tracks were found
            if (result.tracks.length === 0)
                return interaction.reply("No results")
            // Add the track to the queue
            let song = result.tracks[0]

            await queue.play(song)
            embed
                .setDescription(`**[${song.title}](${song.url})** has been added to the Queue`)
                .setThumbnail(song.thumbnail)
                .setFooter({ text: `Duration: ${song.duration}`});

            if (currentSong) {
				console.log('3');
                queue.node.skip();
            }

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