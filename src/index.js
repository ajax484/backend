import express, { json } from "express";
import cors from "cors";
import body__parser from "body-parser";
import { default as router } from "./routes/index.js";
import { default as dotenv } from "dotenv";
dotenv.config();

const { json: _json, urlencoded } = body__parser;

const app = express();
app.use(cors({ origin: true }));
app.use(_json());
app.use(json());
app.use(urlencoded({ extended: false }));

app.get("/ping", (request, response) => {
  response.status(200).send({ message: "you ringed??" });
});

app.use("/", router);

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
