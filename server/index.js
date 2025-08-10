import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import quizRoutes from "./routes/quizRoutes.js";
import questionRoutes from "./routes/questionRoutes.js";
import authRoutes from "./routes/authRoutes.js";
const app = express();
dotenv.config();

const port = process.env.PORT;
const corsOption = { origin: ["http://localhost:5173"] };
app.use(cors(corsOption));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.use("/quize", quizRoutes);
app.use("/quize", questionRoutes);
app.use("/quize", authRoutes);

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}/quize`);
});
