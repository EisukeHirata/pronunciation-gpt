const express = require("express");
const cors = require("cors");
const fetch = require("node-fetch");
const dotenv = require("dotenv");

dotenv.config();

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const OPENAI_API_URL =
  "https://api.openai.com/v1/engines/davinci-codex/completions";

const app = express();
app.use(cors());
app.use(express.json());

app.get("/random-sentence", async (req, res) => {
  const prompt = "Create a random, simple English sentence:";
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      prompt: prompt,
      max_tokens: 20,
      n: 1,
      stop: null,
      temperature: 0.7,
    }),
  };

  try {
    const response = await fetch(OPENAI_API_URL, requestOptions);
    const data = await response.json();
    res.json({ sentence: data.choices[0].text.trim() });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch random sentence" });
  }
});

app.listen(3001, () => {
  console.log("Server is running on port 3001");
});
