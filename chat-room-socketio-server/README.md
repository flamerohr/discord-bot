# Chat Room Socket.IO Server

The Socket.IO server process.

## Getting Started

1. Run the below command to install dependencies from the root directory of the project.

   ```bash
   npm install
   ```

2. Run the server:

   ```bash
   npm run start
   # or
   npm start
   ```

3. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Running docker image

In some cases, I'd need to run the server inside docker rather than my own image, so it is helpful to utilise the `Dockerfile` defined here.

To build the image:

```bash
docker build -t chat-room-socketio-server .
```

To run the server inside the image:

```bash
docker run -v "$(PWD):/usr/node" -p 8000:8000 chat-room-socketio-server run start
```

You can use any other `npm` commands with the format above, for example to install `express`:

```bash
docker run -v "$(PWD):/usr/node" chat-room-socketio-server install express
```
