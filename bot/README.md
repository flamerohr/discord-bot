# Discord bot

A co-op bot that sets up chat rooms for players of the `Guardian Tales` game to chat and arrange co-op matches.

## Getting started

Setup a discord application/bot by following Step 1 [here](https://www.digitalocean.com/community/tutorials/how-to-build-a-discord-bot-with-node-js).

Copy `.env.template` and name it `.env`, replace the relevant data in there with your application credentials.

Invite your bot to a server with this link, replace `${DISCORD_CLIENT_ID}` with what is in your `.env` file:

```text
https://discord.com/api/oauth2/authorize?client_id=${DISCORD_CLIENT_ID}&permissions=26688&scope=bot
```

> Developer Tip 💡
>
> The url has `permissions=26688`, which means it asks for the below permissions for the bot:
>
> - Send Messages
> - Manage Messages
> - Embed Links
> - Add Reactions

Run the following commands in this project:

```bash
npm install
npm start
```

Chat away with the bot. You can start by typing up `co!help`.

## Useful References

Shows setting up and how to debug the discord bot
<https://www.howtogeek.com/364225/how-to-make-your-own-discord-bot/>

Shows setting up and how to get things started with commands
<https://www.digitalocean.com/community/tutorials/how-to-build-a-discord-bot-with-node-js>

Discord API docs
<https://discord.js.org/#/docs/main/stable/examples/ping>

## Running docker image

In some cases, I'd need to run the server inside docker rather than my own image, so it is helpful to utilise the `Dockerfile` defined here.

To build the image:
```
docker build -t discord-bot .
```

To run the server inside the image:
```
docker run -v $PWD:/usr/node discord-bot run start
```

You can use any other `npm` commands with the format above, for example to install `express`:
```
docker run -v $PWD:/usr/node discord-bot install express
```
