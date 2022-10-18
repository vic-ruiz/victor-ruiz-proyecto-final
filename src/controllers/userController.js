import UserServices from "../services/userServices";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

export default class UserController{
    constructor() {
        this.userServices = new UserServices();
      }

      createUser = async (req, res) => {
        try {
          const dataUser = req.body;
          const user = await this.userService.userSave(dataUser);
          res.status(200).json({ message: "usuario creado con exito", user });
        } catch (error) {
          res.status(500).json({ message: "Error al crear el usuario", error });
        }
      };

      getLogin = async (req, res) => {
        try {
          res.status(200).render("login");
        } catch (err) {
          res.status(500).json({ message: err.message });
        }
      };

      postlogin = async (req, res) => {
        try {
          const { email, password } = req.body;
          if (!email || !password) {
            return res.status(401).json({ message: "Complete los datos" });
          }
          const user = await this.servicesUser.getByMail(email);
          let isValid = false;
          if (user !== null) {
            isValid = await comparePassword(password, user.password);
          }
          if (!isValid) {
            return res
              .status(401)
              .redirect('/api/users/errorLogin');
          }
          req.session.user = user;
          const token = await generateToken(user);
          // pongo esta logica para usar las vistas en EJS:
          console.log(token)
          res.status(200).redirect('/api/productos') 
          // pero esto es lo que le deberia pasar al fron cuando lo tengamos creado:
    /*       res.json({
            name: user.name,
            email: user.email,
            token,
          }); */
        } catch (error) {
          console.log(error);
          res.status(500).json({ message: "Error de servidor." });
        }
      };
}