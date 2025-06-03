import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import axios from "axios";

dotenv.config();

const port = process.env.PORT;

const corsOption = {
  origin: ["http://localhost:5173"],
};

const app = express();
app.use(express.json());

app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors(corsOption));

app.post("/quize/TriviaQuize", async (req, res) => {
  const difficultyLevel = req.body.difficulty;
    const numQues = req.body.numQuestions;
  if (!difficultyLevel || !numQues) {
    return res.status(400).json({error:"Enter the details"});
  }
  try {
    const randomQuizes = await axios.get(
      `https://opentdb.com/api.php?amount=${numQues}&difficulty=${difficultyLevel}`
    );
    res.json(randomQuizes.data);
    console.log("Recieved Successfully");
  } catch (err) {
    console.log("error at fetching random quizes - trivia", err.message);
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}/quize`);
});
