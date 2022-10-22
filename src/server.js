import http from "http";
import express from "express";
import { Server } from "socket.io";
import indexRouter from "./routes/indexRoutes.js";
import { connectMongoDB } from "./persistence/configMongoDB.js";
import session from "express-session";
import MongoStore from "connect-mongo";
import morgan from "morgan";
import cluster from "cluster";
import os from "os";
import socket from "./utils/socket/socket.js";
import { dirname } from "path";
import { fileURLToPath } from "url";

const PORT = process.env.PORT || 8080;
const MODO = process.env.MODO || "fork";
const nroCPUs = os.cpus().length;

if (cluster.isPrimary && MODO === "cluster") {
  console.log(
    `🧮 Primary PID ${process.pid} is running. On port ${PORT}. 🧑‍💻 MODO: ${MODO}.`
  );
  for (let i = 0; i < nroCPUs; i++) {
    cluster.fork();
  }
  cluster.on("exit", (worker, code, signal) => {
    console.log(`worker ${worker.process.pid} died`);
  });
} else {
  const app = express();
  const httpServer = http.createServer(app);
  const io = new Server(httpServer);
  connectMongoDB();
  socket(io);

  app.use(morgan("dev"));
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(
    session({
      secret: "secret",
      resave: true,
      saveUninitialized: true,
      store: MongoStore.create({
        mongoUrl: process.env.MONGO_PASS,
        ttl: 60 * 10,
      }),
    })
  );

  const __dirname = dirname(fileURLToPath(import.meta.url));
  app.use(express.static(__dirname + "/public"));
  app.set("views", "./src/views");
  app.set("view engine", "ejs");

  app.use("/", indexRouter);
  app.get("/", (req, res) => {
    res.redirect("/register");
  });

  const server = httpServer.listen(PORT, () => {
    console.log(` 🚀 Server started at http://localhost:${PORT}
                  🧑‍🔧 Worker PID: ${process.pid}. 
                  🧑‍💻 MODO: ${MODO}.`);
  });

  server.on("error", (err) => console.log(err));
}
