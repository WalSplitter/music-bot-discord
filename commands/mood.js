const { SlashCommandBuilder } = require("@discordjs/builders")
const { EmbedBuilder } = require("discord.js")
const { QueryType } = require("discord-player")

module.exports = {
	data: new SlashCommandBuilder()
		.setName("mood")
		.setDescription("Festgelegte Soundtracks für DnD!")
		.addSubcommand(subcommand =>
			subcommand
				.setName("building")
				.setDescription("Spielt A-Team montage Musik ab.")				
		)
        .addSubcommand(subcommand =>
			subcommand
				.setName("doom")
				.setDescription("The Only Thing They Fear Is You!")				
		)
		.addSubcommand(subcommand =>
			subcommand
				.setName("martial-arts")
				.setDescription("Spielt Bloodsport Theme von Paul Hertzog ab.")				
		)
        .addSubcommand(subcommand =>
			subcommand
				.setName("saufen")
				.setDescription("Alliance Taverns - Music & Ambience - World of Warcraft")				
		)
        .addSubcommand(subcommand =>
			subcommand
				.setName("training")
				.setDescription("Training Training Training!")				
		)
		.addSubcommand(subcommand =>
			subcommand
				.setName("vietnam")
				.setDescription("Jon Longbow's Flashback-Song.")				
		)
        .addSubcommand(subcommand =>
			subcommand
				.setName("warten")
				.setDescription("Warte-Musik")				
		)
		.addSubcommand(subcommand =>
			subcommand
				.setName("haselnüsse")
				.setDescription("Spielt Jqeues Raupé x Felix Harrer - 3 Haselnüsse (2:28) ab.")				
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
			'building': 'https://www.youtube.com/watch?v=2y4Z6jWC6qs',        
            'doom': 'https://www.youtube.com/watch?v=kpnW68Q8ltc',
			'martial-arts': 'https://www.youtube.com/watch?v=hiiFJNjvnwc',        
            'training': 'https://www.youtube.com/watch?v=vK4gv11PTI8',        
            'warten': 'https://www.youtube.com/watch?v=DykZEOV5wD4&t',
            'saufen': 'https://www.youtube.com/watch?v=Oeo2VCCtUZQ',
			'vietnam': 'https://www.youtube.com/watch?v=ZWijx_AgPiA',			
			'haselnüsse': 'https://www.youtube.com/watch?v=jagn5IwwiyI'
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