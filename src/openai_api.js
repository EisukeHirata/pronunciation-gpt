import "dotenv/config";

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const OPENAI_API_URL =
  "https://api.openai.com/v1/engines/davinci-codex/completions";

export async function getRandomSentence() {
  try {
    const response = await fetch("http://localhost:3001/random-sentence");
    const data = await response.json();
    return data.sentence;
  } catch (error) {
    console.error("Failed to fetch random sentence", error);
    return "Error: Could not fetch a random sentence";
  }
}
export async function evaluatePronunciation(userSpeech, originalSentence) {
  const prompt = `Evaluate the pronunciation of the following user speech: "${userSpeech}" for the given English sentence: "${originalSentence}"`;

  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      prompt: prompt,
      max_tokens: 50,
      n: 1,
      stop: null,
      temperature: 0.7,
    }),
  };

  const response = await fetch(OPENAI_API_URL, requestOptions);
  const data = await response.json();
  return data.choices[0].text.trim();
}
