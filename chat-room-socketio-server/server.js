// See Socket IO Server initialization:
//   https://socket.io/docs/v4/server-initialization/
const io = require('socket.io')({
  cors: {
    // For production, you'd want to be more strict with the CORS
    // policy for security reasons. For more information, see:
    //   https://socket.io/docs/v4/handling-cors/
    origin: "*",
    methods: ["GET", "POST"]
  }
});
const { addUser, getUser, deleteUser, getUsers } = require('./scripts/users')

io.on('connection', function(socket) {
  // once a client has connected, we expect to get a
  // ping from them saying what room they want to joinRoom
  //
  // Note that this uses a concept called acknowledgements.
  // See:
  //   https://socket.io/docs/v4/emitting-events/#Acknowledgements
  socket.on('joinRoom', function({name, room}, callback) {
    const { user, error } = addUser(socket.id, name, room)
    if (error)
      return callback(error);
    socket.join(user.room)
    socket.in(room).emit('notification', { title: 'Someone\'s here', description: `${user.name} just entered the room` })
    io.in(room).emit('users', getUsers(room))
    return callback()
  });

  socket.on('sendMessage', message => {
    const user = getUser(socket.id)
    io.in(user.room).emit('message', { username: user.name, content: message });
  })

  socket.on("disconnect", () => {
    console.log("User disconnected");
    const user = deleteUser(socket.id)
    if (user) {
      io.in(user.room).emit('notification', { title: 'Someone just left', description: `${user.name} just left the room` })
      io.in(user.room).emit('users', getUsers(user.room))
    }
  })
});

const port = process.env.PORT || 8000;
io.listen(port);
console.log('listening on port ', port);