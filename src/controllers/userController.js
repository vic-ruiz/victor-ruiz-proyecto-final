import UserServices from "../services/userServices";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

export default class UserController {
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
      const user = await this.userServices.getByMail(email);
      let isValid = false;
      if (user !== null) {
        isValid = await comparePassword(password, user.password);
      }
      if (!isValid) {
        return res.status(401).redirect("/users/errorLogin");
      }
      const userAuthenticated = await this.userService.userLogin(
        email,
        password
      );
      req.session.user = user;
      const { token } = userAuthenticated;
      res.cookie("token", token, { maxAge: 60 * 60 * 60 * 600, path: "/" });
      res.cookie("email", email, { maxAge: 60 * 60 * 60 * 600, path: "/" });
      res.status(201).json(userAuthenticated);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Error de servidor." });
    }
  };

  errorLogin = async (req, res) => {
    try {
      res.status(200).render("errorLogin");
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };

  getRegister = async (req, res) => {
    try {
      res.status(200).render("register");
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };

  postRegister = async (req, res) => {
    try {
      const newUser = req.body;
      const exist = await this.userServices.getByMail(newUser.email);
      if (exist) {
        res.status(401).redirect("/users/errorRegister");
      } else {
        newRegister = await this.userServices.createUser(newUser);
        res.status(200).redirect("/users/register");
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ error_description: "Error en el servidor." });
    }
  };

  errorRegister = async (req, res) => {
    try {
      res.status(200).render("errorRegister");
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };

  mailRegister = async (req, res) => {
    try {
      const user = await this.userServices.getByMail(req.session.user.email);

      let nombre = user.nombre;
      let apellido = user.apellido;
      let email = user.email;

      let htmlTemplate = `
                <h1>Bienvenido ${nombre} ${apellido}</h1>
                <p>
                Su correo ${email} ha sido registrado con éxito.
                </p>
                `;

      const transporter = nodemailer.createTransport({
        host: "smtp-relay.sendinblue.com",
        port: 587,
        auth: {
          user: process.env.USER_SENDINGBLUE,
          pass: process.env.PASS_SENDINGBLUE,
        },
      });

      await transporter.sendMail({
        from: "Victor Ruiz <ruizevictor@gmail.com>",
        to: email,
        subject: "Regitro de user exitoso",
        html: htmlTemplate,
      });

      res.status(200).redirect("/api/main");
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };
}
