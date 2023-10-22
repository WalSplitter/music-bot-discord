const { SlashCommandBuilder } = require("@discordjs/builders")

module.exports = {
	data: new SlashCommandBuilder()
        .setName("exit")
        .setDescription("Kick the bot from the channel."),
	execute: async ({ client, interaction }) => {

        // Get the current queue
		const queue = client.player.nodes.get(interaction.guildId)

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
	},
}