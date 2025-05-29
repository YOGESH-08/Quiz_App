import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const corsOption = {
  origin: ["http://localhost:5173"],
};

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
const port = process.env.PORT;
app.use(cors(corsOption));

app.get("/api", (req, res) => {
  res.json({ fruits: ["apple", "orange", "bananna"] });
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}/api`);
});
