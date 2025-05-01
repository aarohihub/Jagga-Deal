const io = require("socket.io")(8800, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
    allowedHeaders: ["my-custom-header"],
    credentials: true,
    origin: "*",
  },
});

let activeUsers = [];

io.on("connection", (socket) => {
  console.log("A user connected");
  socket.on("new-user-add", (newUserId) => {
    if (!activeUsers.some((user) => user.userId === newUserId)) {
      activeUsers.push({
        userId: newUserId,
        socketId: socket.id,
      });
    }
    io.emit("get-users", activeUsers);
  });

  socket.on("send-message", (data) => {
    const { receiverId } = data;
    const user = activeUsers.find((user) => user.userId === receiverId);
    console.log("Sending from socket to :", receiverId);
    if (user) {
      io.to(user.socketId).emit("receive-message", data);
    }
  });
  socket.on("disconnect", () => {
    activeUsers = activeUsers.filter((user) => user.socketId !== socket.id);
    io.emit("get-users", activeUsers);
  });
});
