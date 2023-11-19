const { SlashCommandBuilder } = require("@discordjs/builders")
const { EmbedBuilder } = require("discord.js")
const { QueryType } = require("discord-player")

module.exports = {
	data: new SlashCommandBuilder()
		.setName("play")
		.setDescription("play a song from YouTube.")
		.addSubcommand(subcommand =>
			subcommand
				.setName("search")
				.setDescription("Searches for a song and plays it")
				.addStringOption(option =>
					option.setName("searchterms").setDescription("search keywords").setRequired(true)
				)
		)
		.addSubcommand(subcommand =>
			subcommand
				.setName("song")
				.setDescription("Plays a single song from YT")
				.addStringOption(option => option.setName("url").setDescription("the song's url").setRequired(true))
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
        
        let song = null;
        
		if (interaction.options.getSubcommand() === "song") {            
            let url = interaction.options.getString("url", true);
            
            // Search for the song using the discord-player
            const result = await client.player.search(url, {
                requestedBy: interaction.user,
                searchEngine: QueryType.YOUTUBE_VIDEO
            })

            // finish if no tracks were found
            if (result.tracks.length === 0)
                return interaction.reply("No results")

            // Add the track to the queue
            song = result.tracks[0];
		}
        else if (interaction.options.getSubcommand() === "search") {

            // Search for the song using the discord-player
            let url = interaction.options.getString("searchterms");

            //console.log('Debugger Logging in "play.js" - searchterms: ' + url);

            const result = await client.player.search(url, {
                requestedBy: interaction.user,
                searchEngine: QueryType.AUTO
            })

            //console.log('Debugger Logging in "play.js" - found tracks: ' + result.tracks.length);

            // finish if no tracks were found
            if (result.tracks.length === 0)
                return interaction.editReply("No results")
            

            // Add the track to the queue
            song = result.tracks[0];            
		}
                
        // Play the song
        //if (!queue.playing) await queue.play();
        //if (!queue.playing) await queue.node.play();    
        
        await queue.play(song);
            embed
                .setDescription(`**[${song.title}](${song.url})** has been added to the Queue`)
                .setThumbnail(song.thumbnail)
                .setFooter({ text: `Duration: ${song.duration}`})

        if (currentSong) {
            queue.node.skip();
        }

        // Respond with the embed containing information about the player
        await interaction.reply({
            embeds: [embed]
        });
        
	},
}