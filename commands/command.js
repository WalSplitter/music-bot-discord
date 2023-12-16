const { SlashCommandBuilder } = require("@discordjs/builders");
const { EmbedBuilder } = require("discord.js");
const { QueryType } = require("discord-player");
const { joinVoiceChannel } = require("@discordjs/voice");
const { ChannelType } = require("discord.js");

module.exports = {
	data: new SlashCommandBuilder()
    .setName("command")
    .setDescription("Basis Kommandos: 'exit', 'pause', 'resume', 'skip' & 'summon'")
    .addSubcommand(subcommand =>
        subcommand
            .setName("exit")
            .setDescription("Kick the bot from the channel.")				
    )
    .addSubcommand(subcommand =>
        subcommand
            .setName("pause")
            .setDescription("Pauses the current song")				
    )
    .addSubcommand(subcommand =>
        subcommand
            .setName("resume")
            .setDescription("Resumes the current song")				
    )
    .addSubcommand(subcommand =>
        subcommand
            .setName("skip")
            .setDescription("Skips the current song")				
    )
    .addSubcommand(subcommand =>
        subcommand
            .setName("summon")
            .setDescription("Summon the bot to the channel.")				
            .addChannelOption((option) => option.setName('channel').setDescription('The channel to join').setRequired(true).addChannelTypes(ChannelType.GuildVoice)),
    ),
	execute: async ({ client, interaction }) => {
        //#region basic stuff
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
        //#endregion
        
		if (interaction.options.getSubcommand() === "exit") {            
            if (!queue)
            {
                await interaction.reply("There are no songs in the queue")
                return;
            }
    
            // Deletes all the songs from the queue and exits the channel
            queue.delete();
    
            const jokes = [
                "Chuck Norris doesn't read books. He stares them down until he gets the information he wants.",
                "Time waits for no man. Unless that man is Chuck Norris.",
                "If you spell Chuck Norris in Scrabble, you win. Forever.",
                "Chuck Norris breathes air ... five times a day.",
                "In the Beginning there was nothing ... then Chuck Norris roundhouse kicked nothing and told it to get a job.",
                "When God said, “Let there be light!” Chuck Norris said, “Say Please.”",
                "Chuck Norris has a mug of nails instead of coffee in the morning.",
                "If Chuck Norris were to travel to an alternate dimension in which there was another Chuck Norris and they both fought, they would both win.",
                "The dinosaurs looked at Chuck Norris the wrong way once. You know what happened to them.",
                "Chuck Norris' tears cure cancer. Too bad he has never cried."
            ];
    
            const random = Math.floor(Math.random() * jokes.length);
    
            await interaction.reply(jokes[random]);
		}
        else if (interaction.options.getSubcommand() === "pause") {
             // Check if the queue is empty
		    if (!queue)
		    {
		    	await interaction.reply("There are no songs in the queue")
		    	return;
		    }

            // Pause the current song
		    queue.node.pause();

            await interaction.reply("Player has been paused.")
		}
        else if (interaction.options.getSubcommand() === "resume") {
            // Get the queue for the server
		    const queue = client.player.nodes.get(interaction.guildId)

            // Check if the queue is empty
		    if (!queue)
            {
                await interaction.reply("No songs in the queue");
                return;
            }

            // Pause the current song
		    queue.node.resume();

            await interaction.reply("Player has been resumed.")
		}
        else if (interaction.options.getSubcommand() === "skip") {
            // Get the queue for the server
		    const queue = client.player.nodes.get(interaction.guildId)

            // If there is no queue, return
		    if (!queue)
            {
                await interaction.reply("There are no songs in the queue");
                return;
            }

            const currentSong = queue.currentTrack

            // Skip the current song
		    queue.node.skip();

            // Return an embed to the user saying the song has been skipped
            await interaction.reply({
                embeds: [
                    new EmbedBuilder()
                        .setDescription(`${currentSong.title} has been skipped!`)
                        .setThumbnail(currentSong.thumbnail)
                ]
            })
		}
        else if (interaction.options.getSubcommand() === "summon") {
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
		}        
	},
}