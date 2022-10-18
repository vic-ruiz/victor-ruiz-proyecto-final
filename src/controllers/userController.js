import UserServices from "../services/userServices.js";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

export default class UserController {
  constructor() {
    this.userServices = new UserServices();
  }

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
      console.log(err)
    }
  };

  postRegister = async (req, res) => {
    try {
      const newUser = req.body;
      console.log(newUser);
      const exist = await this.userServices.getByMail(newUser.email);
      if (exist) {
        res.status(401).redirect("/users/errorRegister");
      } else {
        const newRegister = await this.userServices.saveUser(newUser);
        console.log(newRegister.nombre)
        req.session.user = {
          email: newRegister.email,
          nombre: newRegister.nombre,
          apellido: newRegister.apellido,
          id: newRegister._id,
        };
        res.status(200).redirect("/mailRegister");
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

      res.status(200).redirect("/register");
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };

  logoutSession = async (req, res) => {
    const nombre = req.session.nombre;
    res.render("logout", { nombre });
    req.session.destroy((err) => {
      if (!err) {
        console.log("Session destroyed");
      } else {
        res.send({ status: "Error" });
      }
    });
  };
}
