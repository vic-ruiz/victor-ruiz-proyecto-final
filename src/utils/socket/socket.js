import MessageDao from "../../persistence/daos/messageDao.js";

export default (io) => {
  const chatDao = new MessageDao();

  io.on("connection", async (socket) => {
    console.log("🟢 Usuario conectado");

    io.sockets.emit("messages", await chatDao.listMessages());

    socket.on("message", async (data) => {
      const { text, email } = data;
      const newMessage = {
        email,
        text,
        date: moment(new Date()).format("DD/MM/YYYY HH:mm"),
      };

      await chatDao.newMessage(newMessage);

      io.sockets.emit("messages", await chatDao.listMessages());
    });
  });
};
