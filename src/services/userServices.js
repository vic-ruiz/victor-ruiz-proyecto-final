import UserDao from "../persistence/daos/usersDao";
import { encryptPassword, comparePassword } from "../utils/bcrypt/bcrypt";
import generateToken from "../utils/jwt/generateJwt";

export default class UserServices {
  constructor() {
    this.userDao = new UserDao();
  }

  async userSave(user) {
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
      await sendMailRegister(userEncrypt);
      return newUser;
    } catch (error) {
      throw new Error("error: ", error);
    }
  }

  async userLogin (email, password) {
    const user = await this.userDao.getByMail(email);
    if (!user) {
      throw new Error("No existe el usuario");
    }
    const verifyPassword = await comparePassword(password, user.password);
    if (!verifyPassword) {
      throw new Error("Contraseña incorrecta");
    }
    const token = await generateJWT(user);
    return {
      user,
      token,
    };
  };
}
