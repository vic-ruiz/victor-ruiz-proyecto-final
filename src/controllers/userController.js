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
      const userAuthenticated = await this.userServices.userLogin(
        email,
        password
      );
      
      const { user, token } = userAuthenticated;
      console.log(user)
      console.log(token)
      req.session.user = user;  
      res.cookie("token", token, { maxAge: 60 , path: "/" });
      res.cookie("email", email, { maxAge: 60, path: "/" });
      res.status(201).redirect("main");
    } catch (error) {
      console.log(error);
      res.status(500).redirect("errorLogin");
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
        res.status(401).redirect("/errorRegister");
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
      res.status(500).redirect("/errorRegister");
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
    const nombre = req.session.user.nombre;
    res.render("logout", { nombre });
    req.session.destroy((err) => {
      if (!err) {
        console.log("Session destroyed");
      } else {
        res.send({ status: "Error" });
      }
    });
  };

  mainViewer =  async(req, res) => {
    try {
      const email = req.session.user.email;
      res.status(200).render("main",{ email });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };

 
}
