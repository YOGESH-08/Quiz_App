import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import axios from "axios";
import pg from "pg";

dotenv.config();

const db = new pg.Client({
  user: process.env.PGUSER,
  host: process.env.PGHOST,
  password: process.env.PGPASSWORD,
  port: process.env.PGPORT,
  database: process.env.PGDATABASE,
});

db.connect();

const port = process.env.PORT;

const corsOption = {
  origin: ["http://localhost:5173"],
};

const app = express();
app.use(express.json());

app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors(corsOption));

app.post("/quize/createquiz/", (req, res) => {
  const quizName = req.body.QuizName;
  res.send("Quiz Name got successfully!");
});



app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}/quize`);
});
