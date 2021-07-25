import openSocket from 'socket.io-client';

let socketIoServer = process.env.NEXT_PUBLIC_SOCKET_IO_SERVER ?? 'http://localhost:8000';
const socket = openSocket(socketIoServer);

export {
  socket
}
