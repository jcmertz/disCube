fs = require('fs');
const {
  database
} = require('../config.json');
const nthline = require('nthline');
const countLinesInFile = require('count-lines-in-file');
async function sendMessage(index,channel){
  msg = await nthline(index, database);
  channel.channel.send(msg);
}
module.exports = {
  name: 'gimme',
  description: 'return a specific quote',
  async execute(message, args) {
    if (!args.length) {
      var temp = countLinesInFile(database, (error, number) => {
        index = Math.floor(Math.random() * number) + 1;
        sendMessage(index,message);
      });
    } else {
      var temp = parseInt(args[0]);
      await sendMessage(temp,message);
    }
  },
};