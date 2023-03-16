import { getRandomSentence, evaluatePronunciation } from "./openai_api.js";
import { startRecording, stopRecording } from "./speech_recognition.js";

document.addEventListener("DOMContentLoaded", () => {
  loadRandomSentence();
  const startBtn = document.getElementById("start");
  const stopBtn = document.getElementById("stop");

  startBtn.addEventListener("click", () => {
    startRecording();
    startBtn.disabled = true;
    stopBtn.disabled = false;
  });

  stopBtn.addEventListener("click", async () => {
    const userSpeech = await stopRecording();
    evaluatePronunciation(userSpeech);
    startBtn.disabled = false;
    stopBtn.disabled = true;
  });
});

async function loadRandomSentence() {
  const sentenceElement = document.getElementById("sentence");
  const sentence = await getRandomSentence();
  sentenceElement.textContent = sentence;
}

async function evaluatePronunciation(userSpeech) {
  const originalSentence = document.getElementById("sentence").textContent;
  const resultElement = document.getElementById("result");
  const feedbackElement = document.getElementById("feedback");

  resultElement.textContent = `You said: "${userSpeech}"`;
  const feedback = await evaluatePronunciation(userSpeech, originalSentence);
  feedbackElement.textContent = feedback;
}
