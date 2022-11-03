module.exports = {
  name: 'rocks',
  description: 'Increases the score of the last cube gimmed',
  async execute(message, args) {
    if (typeof cubes != 'undefined') {
      cubes[cubes.lastCubeIndex].score++;
      message.channel.send("Cube "+cubes.lastCubeIndex+" now has a score of "+cubes[cubes.lastCubeIndex].score);
      message.channel.send(cubes[cubes.lastCubeIndex].quote);
    }
  }
};