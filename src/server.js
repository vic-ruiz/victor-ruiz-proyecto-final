import express from "express";
import indexRouter from "./routes/indexRoutes.js";
import { connectMongoDB } from "./persistence/configMongoDB.js";


const app = express();
const PORT = process.env.PORT || 8080;

connectMongoDB();


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", indexRouter);

const server = app.listen(PORT, () => {
  console.log(` 🚀 Server started at http://localhost:${PORT}`);
});

server.on("error", (err) => console.log(err));
