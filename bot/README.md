# Discord bot

For flamer's testing mainly.

## Getting started

Setup a discord application/bot by following Step 1 here:
https://www.digitalocean.com/community/tutorials/how-to-build-a-discord-bot-with-node-js

Copy `.env.template` and name it `.env`, replace the relevant data in there with your application credentials.

Invite your bot to a server with this link, replace `${DISCORD_CLIENT_ID}` with what is in your `.env` file

```
https://discord.com/api/oauth2/authorize?client_id=${DISCORD_CLIENT_ID}&permissions=18496&scope=bot
```

Run the following commands in this project:

```
npm install
npm start
```

Chat away with the bot.


## Useful References

Shows setting up and how to debug the discord bot
https://www.howtogeek.com/364225/how-to-make-your-own-discord-bot/

Shows setting up and how to get things started with commands
https://www.digitalocean.com/community/tutorials/how-to-build-a-discord-bot-with-node-js

Discord API docs
https://discord.js.org/#/docs/main/stable/examples/ping
