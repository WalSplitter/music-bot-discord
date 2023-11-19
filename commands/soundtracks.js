const { SlashCommandBuilder } = require("@discordjs/builders")
const { EmbedBuilder } = require("discord.js")
const { QueryType } = require("discord-player")

module.exports = {
	data: new SlashCommandBuilder()
		.setName("soundtracks")
		.setDescription("Festgelegte Soundtracks für DnD!")
		.addSubcommand(subcommand =>
			subcommand
				.setName("barde")
				.setDescription("Spielt eine festgelegte Barden-Musik ab.")				
		)
        .addSubcommand(subcommand =>
			subcommand
				.setName("doom")
				.setDescription("The Only Thing They Fear Is You!")				
		)
        .addSubcommand(subcommand =>
			subcommand
				.setName("dorf")
				.setDescription("Spielt eine festgelegte Dorf-Musik ab.")				
		)
        .addSubcommand(subcommand =>
			subcommand
				.setName("dramatik")
				.setDescription("Spielt festgelegte dramatische Musik ab.")				
		)
        .addSubcommand(subcommand =>
			subcommand
				.setName("entspannt")
				.setDescription("Spielt festgelegte entspannte Musik ab.")				
		)
        .addSubcommand(subcommand =>
			subcommand
				.setName("erkunden")
				.setDescription("Spielt festgelegtes Erkundungs-Musik ab.")				
		)
        .addSubcommand(subcommand =>
			subcommand
				.setName("freude")
				.setDescription("Spielt festgelegtes glückliche Musik ab.")				
		)
        .addSubcommand(subcommand =>
			subcommand
				.setName("hinterhalt")
				.setDescription("Spielt festgelegte drückende Musik ab.")				
		)
        .addSubcommand(subcommand =>
			subcommand
				.setName("höhle")
				.setDescription("Spielt festgelegte drückende finstere Musik ab.")				
		)
        .addSubcommand(subcommand =>
			subcommand
				.setName("krieg")
				.setDescription("Spielt einen festgelegten Soundtrack ab mit Kriegsgeräuschen.")				
		)
        .addSubcommand(subcommand =>
			subcommand
				.setName("küste")
				.setDescription("Spielt festgelgte Küsten Melodien ab.")				
		)
        .addSubcommand(subcommand =>
			subcommand
				.setName("lagerfeuer")
				.setDescription("Spielt Lagerfeuer Musik ab.")				
		)
        .addSubcommand(subcommand =>
			subcommand
				.setName("markt")
				.setDescription("Spielt festgelegte Markt-Hintergrund Geräusche ab.")				
		)
        .addSubcommand(subcommand =>
			subcommand
				.setName("monster")
				.setDescription("Spielt finstere Musik ab.")				
		)
        .addSubcommand(subcommand =>
			subcommand
				.setName("party")
				.setDescription("Spielt ausgelassende Musik ab.")				
		)
        .addSubcommand(subcommand =>
			subcommand
				.setName("saufen")
				.setDescription("Alliance Taverns - Music & Ambience - World of Warcraft")				
		)
        .addSubcommand(subcommand =>
			subcommand
				.setName("schlacht")
				.setDescription("Spielt Kampf Musik ab.")				
		)
        .addSubcommand(subcommand =>
			subcommand
				.setName("schmiede")
				.setDescription("Spielt Schieden-Geräusche ab.")				
		)
        .addSubcommand(subcommand =>
			subcommand
				.setName("stadt")
				.setDescription("Spielt Stadt-Geräusche ab.")				
		)
        .addSubcommand(subcommand =>
			subcommand
				.setName("taverne")
				.setDescription("Spielt Tavernen Musik ab.")				
		)
        .addSubcommand(subcommand =>
			subcommand
				.setName("training")
				.setDescription("Training Training Training!")				
		)
        .addSubcommand(subcommand =>
			subcommand
				.setName("wald")
				.setDescription("Spielt Wald-Geräusche ab.")				
		)
        .addSubcommand(subcommand =>
			subcommand
				.setName("warten")
				.setDescription("Warte-Musik")				
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
            'barde': 'https://www.youtube.com/watch?v=M0pOMVCUY50',
            'dorf': 'https://www.youtube.com/watch?v=8u9ZC8WLIiU',
            'doom': 'https://www.youtube.com/watch?v=kpnW68Q8ltc',
            'dramatik': 'https://www.youtube.com/watch?v=RPkHu8M_U4c',
            'entspannt': 'https://www.youtube.com/watch?v=Xsj6prK43nY',
            'erkunden': 'https://www.youtube.com/watch?v=Y4vSLXjxImY',
            'freude': 'https://www.youtube.com/watch?v=wo_T9Kx3p4s',
            'hinterhalt': 'https://www.youtube.com/watch?v=WW4bdFhcZgw',
            'höhle': 'https://www.youtube.com/watch?v=_8A8N9BI6T4',
            'krieg': 'https://www.youtube.com/watch?v=0rl7AatkjfA',
            'küste': 'https://www.youtube.com/watch?v=4W2EfqdOmiI',
            'lagerfeuer': 'https://www.youtube.com/watch?v=8tWmmhhJEjw',
            'markt': 'https://www.youtube.com/watch?v=Ch4rFfqd5BQ',
            'monster': 'https://www.youtube.com/watch?v=KU5EzBErrZ4',
            'party': 'https://www.youtube.com/watch?v=x3skYa2i6Bg',
            'schlacht': 'https://www.youtube.com/watch?v=_YpKEpF0oxo',
            'schmiede': 'https://www.youtube.com/watch?v=gS0sNL82Tvk',
            'stadt': 'https://www.youtube.com/watch?v=ddMSMwKQkKI',
            'taverne': 'https://www.youtube.com/watch?v=JyyQlYRqvRs',
            'training': 'https://www.youtube.com/watch?v=vK4gv11PTI8',
            'wald': 'https://www.youtube.com/watch?v=4Y6n-1XQSfE',
            'warten': 'https://www.youtube.com/watch?v=DykZEOV5wD4&t',
            'saufen': 'https://www.youtube.com/watch?v=Oeo2VCCtUZQ'
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