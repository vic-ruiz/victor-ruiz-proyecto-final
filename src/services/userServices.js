import UserDao from "../persistence/daos/usersDao.js";
import { encryptPassword, comparePassword } from "../utils/bcrypt/bcrypt.js";
import generateToken from "../utils/jwt/generateJwt.js";

export default class UserServices {
  constructor() {
    this.userDao = new UserDao();
  }

  async saveUser(user) {
    try {
      const { nombre, apellido, email, password, phone } = user;
      const encryptedPassword = await encryptPassword(password);
      const userEncrypt = {
        nombre,
        apellido,
        email,
        password: encryptedPassword,
        phone,
      };
      const newUser = await this.userDao.saveUser(userEncrypt);
      console.log(newUser);
      return newUser;
    } catch (error) {
      throw new Error("error: ", error);
    }
  }

  async userLogin(email, password) {
    const user = await this.userDao.getByMail(email);
    if (!user) {
      throw new Error("No existe el usuario");
    }
    const verifyPassword = await comparePassword(password, user.password);
    if (!verifyPassword) {
      throw new Error("Contraseña incorrecta");
    }
    const token = await generateToken(user);
    return {
      user,
      token,
    };
  }

  async getByMail(mail) {
    try {
      const user = await this.userDao.getByMail(mail);
      return user;
    } catch (err) {
      throw new Error(err);
    }
  }
}
