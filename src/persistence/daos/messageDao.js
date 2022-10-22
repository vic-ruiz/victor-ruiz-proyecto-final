import Message from "../models/MessageSchema.js";

export default class MessageDao {
  constructor() {
    this.messageModel = Message;
  }

  async listMessages() {
    try {
      return await this.messageModel.find();
    } catch (error) {
      throw new Error(`Error al listar el chat: ${error}`);
    }
  }

  async getMessagesByEmail(email) {
    try {
      return await this.messageModel.find({ email: email });
    } catch (error) {
      throw new Error(`Error al listar el chat por email: ${error}`);
    }
  }

  async newMessage (message) {
    try {
      const newMessage = new this.messageModel.create(message);
      return newMessage;
    } catch (error) {
      throw new Error("No se pudo guardar el mensaje", error);
    }
  };

  async deleteMessages() {
    try {
      return await this.messageModel.deleteMany();
    } catch (error) {
      throw new Error("No se pudieron eliminar los mensajes", error);
    }
  };
}
