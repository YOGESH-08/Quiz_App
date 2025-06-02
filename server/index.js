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

app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors(corsOption));



app.get("/quize/random",async (req,res)=>{
  try{
    // const randomQuizes = await axios.get("https://opentdb.com/api.php?amount=10");
    res.json(randomQuizes.data);
  }
  catch(err){
    console.log("error at fetching random quizes - trivia", err.message);
  }
});


app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}/quize`);
});