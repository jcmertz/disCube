fs = require('fs');
const {
  database
} = require('../config.json');
module.exports = {
  name: 'slurp',
  description: 'ingest new quotes',
  args: true,
  execute(message, args) {
    fs.writeFile(database, args[0] + "\n", {
      'flag': 'a'
    }, function(err) {
      if (err) return console.log(err);
      console.log('Slurped!');
    });
    message.channel.send('Slurp.');
  },
};