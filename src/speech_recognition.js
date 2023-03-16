let recognition;
let recordedText = "";

export function startRecording() {
  recognition = new webkitSpeechRecognition();
  recognition.lang = "en-US";
  recognition.start();

  recognition.onresult = (event) => {
    recordedText = event.results[0][0].transcript;
  };
}

export async function stopRecording() {
  return new Promise((resolve) => {
    recognition.onend = () => {
      resolve(recordedText);
    };
    recognition.stop();
  });
}
