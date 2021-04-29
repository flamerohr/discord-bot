const { stripIndent } = require('common-tags');

module.exports = (client, message) => {
  message.channel.send(stripIndent`
    Welcome to my help command!
    Here are a list of commands to choose from:
    - \`start\`
    - \`help\`
    - \`ping\`
  `);
};
