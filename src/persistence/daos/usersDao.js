import User from "../models/UsersSchema.js";

export default class UserDao {
  constructor() {
    this.userModel = new User();
  }

  async saveUser(user) {
    try {
      const newUser = new this.userModel(user);
      await newUser.save();
      return newUser;
    } catch (error) {
      throw new Error("Error al guardar el usuario", error);
    }
  }

  async getByName(name) {
    try {
      const user = await this.userModel.findOne({ nombre: name });
      return user;
    } catch (err) {
      throw new Error(err);
    }
  }

  async getByMail(mail) {
    try {
      const user = await this.userModel.findOne({ email: mail });
      return user;
    } catch (err) {
      throw new Error(err);
    }
  }
}
