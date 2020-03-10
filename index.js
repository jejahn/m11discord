const Discord = require('discord.js');
const client = new Discord.Client();
//const config = require('./config.json'); Wird durch das const der nächsten Variable abgelöst
const { prefix, token } = require('./config.json'); // In der const wird nun ein JSON-Aufruf gemacht, weil die config Datei im JSON-Format geschrieben ist

client.once('ready', () => {
    console.log('Ready!');
});


// Wenn eine Nachricht in einem der aktiven Server gesendet wird, so wird sie in der Konsolensitzung geloggt:
/**client.on('message', message => {
    console.log(message.content);
});**/

client.on('message', message => {
    if(message.content === prefix+'ping') {
        // sende die Nachricht "Pong." an den Kanal, in dem eine Nachricht die Nachricht "m11ping" geschickt wurde.
        message.channel.send('Pong.');
    } else if (message.content === prefix+'beep') {
        message.channel.send('Boop.');
    } else if (message.content === prefix+'server') {
        message.channel.send('Servername: '+message.guild.name+'\nMitglieder: '+message.guild.memberCount);
    }
});

const filter = (reaction, user) => {
	return ['👍', '👎'].includes(reaction.emoji.name) && user.id === message.author.id;
};

client.on('message', message => {
	//message.react('👍').then(() => message.react('👎'));

	const filter = (reaction, user) => {
		return ['👍', '👎'].includes(reaction.emoji.name) && user.id === message.author.id;
	};

	message.awaitReactions(filter, { max: 1, time: 60000, errors: ['time'] })
		.then(collected => {
			const reaction = collected.first();

			if (reaction.emoji.name === '👍') {
				message.reply('you reacted with a thumbs up.');
			} else {
				message.reply('you reacted with a thumbs down.');
			}
		})
		.catch(collected => {
			console.log(`After a minute, only ${collected.size} out of 4 reacted.`);
			message.reply('you didn\'t react with neither a thumbs up, nor a thumbs down.');
		});
});

//client.login('Njg2NzA3Mjc4MDc4MDE3NTc2.XmbI-A.2WGl0WjzYOsP2eeRjgivbi6VJD8'); Veraltete Form, wird durch config.json abgelöst (siehe nächste Zeile)
//client.login(config.token);
client.login(token);

//686984559262171152

