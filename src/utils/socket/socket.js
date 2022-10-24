import MessageDao from "../../persistence/daos/messageDao.js";

export default (io) => {
  const chatDao = new MessageDao();

  io.on("connection", async (socket) => {
    console.log("🟢 Usuario conectado");

    io.sockets.emit("messages", await chatDao.listMessages());

    socket.on("message", async (data) => {
      console.log(data);
      const { text, email } = data;
      const newMessage = {
        email,
        text,
        date: new Date().toString(),
      };
      console.log(newMessage);

      await chatDao.newMessage(newMessage);

      io.sockets.emit("messages", await chatDao.listMessages());
    });
  });
};
