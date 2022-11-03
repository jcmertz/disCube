const weightedRandom = require('../helperModules/weightedRandom');
module.exports = {
  name: 'gimme',
  description: 'return a specific quote',
  async execute(message, args) {
    if (typeof cubes != 'undefined') {
      if (!args.length) {
        temp = weightedRandom.get(cubes);
        index = temp.index;
        cubes.lastCubeIndex = index;
        message.channel.send(temp.cube.quote);
      } else {
        var index = parseInt(args[0]);
        cubes.lastCubeIndex = index;
        message.channel.send(cubes[index].quote);
      }
    }
  },
};