const fs = require('fs');
const Discord = require('discord.js');
const { EmbedBuilder } = require('discord.js');
var CronJob = require('cron').CronJob;
const {
  prefix,
  token,
  database
} = require('./config.json');
cubesRaw = fs.readFileSync(database);
cubes=JSON.parse(cubesRaw);
const client = new Discord.Client();
client.commands = new Discord.Collection();


const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
  const command = require(`./commands/${file}`);

  // set a new item in the Collection
  // with the key as the command name and the value as the exported module
  client.commands.set(command.name, command);
}

client.once('ready', () => {
  console.log('Ready!');
  //Section Below is commented out. It's function is to deliver cubes at specific times.
  // var job = new CronJob('0 10,18 * * *', function() {
  //   temp = countLinesInFile(database, async (error, number) => {
  //     index = Math.floor(Math.random() * number) + 1;
  // 		msg = await nthline(index, database);
  // 		var guild = client.guilds.cache.get('778859123374161928');
  // 		if (guild && guild.channels.cache.get('778859124305166338')) {
  // 			guild.channels.cache.get('778859124305166338').send(msg);
  // 		} else {
  // 			console.log("nope");
  // 			//if the bot doesn't have guild with the id guildid
  // 			// or if the guild doesn't have the channel with id channelid
  // 		}
  //   });
  // }, null, true, 'America/Chicago');
  // job.start();
});

client.on('message', message => {
  //console.log(message.content);
  if (!message.content.startsWith(prefix) || message.author.bot) {
    return;
  }

  const args = message.content.slice(prefix.length).trim().split(/ (.+)/);
  const commandName = args.shift().toLowerCase();

  if (!client.commands.has(commandName)) return;
  const command = client.commands.get(commandName);

  if (command.args && !args.length) {
    return message.channel.send(`You didn't provide any arguments, ${message.author}!`);
  }
  success = false;
  try {
    command.execute(message, args);
    success = true;
  } catch (error) {
    console.error(error);
    message.reply('there was an error trying to execute that command!');
  }
  if (success && commandName == 'slurp') {
    success = false;
    try {
      client.commands.get('gimme').execute(message, []);
    } catch (error) {
      console.error(error);
      message.reply('Bonus Gimme Failed');
    }
  }

});

client.login(process.env.BOT_TOKEN);