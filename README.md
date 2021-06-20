# Discord bot

A co-op bot that sets up chat rooms for players of the `Guardian Tales` game to chat and arrange co-op matches.

## Projects

This repository has multiple projects.

Project Name | Description
--- | ---
[bot](./bot/README.md) | The project for the Discord bot. The bot coordinates players to join chat rooms for co-op, via a link.
[chat-room](./chat-room/README.md) | The chat room service static website which the bot links to, for players to set up co-op.
[chat-room-socketio-server](./chat-room-socketio-server/README.md) | The socket.io server which enables real-time functionality for the `chat-room` application.

## Getting Started

### Via NPM Scripts

Set up the Discord bot project's `.env` file. For more information, see [Bot - Getting Started](./bot/README.md#getting-started)

1. Open up the terminal, and navigate to the root of the repository.

2. Run the below command to install all project dependencies:

   ```bash
   npm install
   npm run install
   ```

3. Run the below command to run all projects:

   ```bash
   npm start
   ```

### Via `docker-compose`

1. Open up the terminal, and navigate to the root of the repository.

2. Run the below command to build & run all projects:

   ```bash
   docker-compose up -d
   ```
