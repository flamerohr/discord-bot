const parser = require('yargs-parser');
const { prefix } = require('../config/bot');

const commands = {
  start: require('./start'),
  room: require('./room'),
  help: require('./help'),
  ping: (client, message, options) => message.channel.send('pong'),
};

const parseCommand = (client, message) => {
  // break up body and find the command name called
  const body = message.content.slice(prefix.length);
  const params = body.split(' ');
  const commandName = params.shift().toLowerCase();

  // check if command exists
  const command = commands[commandName];
  if (!command) return;

  // parse the options with `yargs-parser`
  const options = parser(params);

  // call the command
  try {
    command(client, message, options);
  } catch (e) {
    // something wrong, this stops the command crashing the app
    console.error(e);
  }
};

module.exports = parseCommand;
