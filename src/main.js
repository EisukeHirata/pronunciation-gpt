import { getRandomSentence, evaluatePronunciation } from "./openai_api.js";

const startButton = document.getElementById("start");
const stopButton = document.getElementById("stop");
const sentenceElement = document.getElementById("sentence");
const resultElement = document.getElementById("result");
const feedbackElement = document.getElementById("feedback");

let recorder;

startButton.addEventListener("click", startRecording);
stopButton.addEventListener("click", stopRecording);
sentenceElement.addEventListener("click", fetchAndDisplayRandomSentence);

async function fetchAndDisplayRandomSentence() {
  const randomSentence = await getRandomSentence();
  sentenceElement.textContent = randomSentence;
}

async function evaluateUserPronunciation(userSpeech) {
  const originalSentence = sentenceElement.textContent;
  const feedback = await evaluatePronunciation(userSpeech, originalSentence);
  feedbackElement.textContent = feedback;
}

async function startRecording() {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    recorder = new MediaRecorder(stream);
    const audioChunks = [];

    recorder.addEventListener("dataavailable", (event) => {
      audioChunks.push(event.data);
    });

    recorder.addEventListener("stop", async () => {
      const audioBlob = new Blob(audioChunks);
      const userSpeech = URL.createObjectURL(audioBlob);
      resultElement.innerHTML = "Processing...";
      await evaluateUserPronunciation(userSpeech);
      resultElement.innerHTML = "Done!";
    });

    recorder.start();
    startButton.disabled = true;
    stopButton.disabled = false;
  } catch (error) {
    console.error("Error starting recording:", error);
  }
}

function stopRecording() {
  if (recorder) {
    recorder.stop();
    startButton.disabled = false;
    stopButton.disabled = true;
  }
}

fetchAndDisplayRandomSentence();
