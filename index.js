const fs = require('fs');
const Discord = require('discord.js');
var CronJob = require('cron').CronJob;
const {
  prefix,
  token,
  database
} = require('./config.json');
const client = new Discord.Client();
client.commands = new Discord.Collection();


const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
  const command = require(`./commands/${file}`);

  // set a new item in the Collection
  // with the key as the command name and the value as the exported module
  client.commands.set(command.name, command);
}

const nthline = require('nthline');
const countLinesInFile = require('count-lines-in-file');
client.once('ready', () => {
  console.log('Ready!');
  var job = new CronJob('0,15,45,30 10-22 * * *', function() {
    temp = countLinesInFile(database, async (error, number) => {
      index = Math.floor(Math.random() * number) + 1;
			msg = await nthline(index, database);
			var guild = client.guilds.cache.get('778859123374161928');
			if (guild && guild.channels.cache.get('778859124305166338')) {
				guild.channels.cache.get('778859124305166338').send(msg);
			} else {
				console.log("nope");
				//if the bot doesn't have guild with the id guildid
				// or if the guild doesn't have the channel with id channelid
			}
    });
  }, null, true, 'America/Chicago');
  job.start();
});

client.on('message', message => {
  if (!message.content.startsWith(prefix) || message.author.bot) return;

  const args = message.content.slice(prefix.length).trim().split(/ +/);
  const commandName = args.shift().toLowerCase();

  if (!client.commands.has(commandName)) return;
  const command = client.commands.get(commandName);

  if (command.args && !args.length) {
    return message.channel.send(`You didn't provide any arguments, ${message.author}!`);
  }

  try {
    command.execute(message, args);
  } catch (error) {
    console.error(error);
    message.reply('there was an error trying to execute that command!');
  }
});

client.login(token);