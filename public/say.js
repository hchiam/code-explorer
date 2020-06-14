let responsiveVoiceIsRunning = false;
let consoleLogOverride = false;

function say(sentence, options) {
  if (sentence != "" && typeof responsiveVoice !== "undefined") {
    const sentenceCallback =
      options && options.sentenceCallback ? options.sentenceCallback : null;
    const manuallySetRate =
      options && (options.rate || options.speed)
        ? options.rate || options.speed
        : 1.5;
    let rate = options && manuallySetRate ? manuallySetRate : 1.5;
    if (sentence.length > 30 && !manuallySetRate) {
      rate = 1;
    }
    if (sentence.length > 100 && !manuallySetRate) {
      rate = 0.9;
      sentence = "I've got a lot to tell you. " + sentence;
    }
    responsiveVoiceIsRunning = true;
    responsiveVoice.speak(sentence, "UK English Male", {
      rate: rate,
      onend: () => {
        responsiveVoiceIsRunning = false;
      },
    });
    consoleLogOverride = true;
    console.log(sentence);
    consoleLogOverride = false;
    if (sentenceCallback) sentenceCallback(sentence);
  }
}

if (typeof exports !== "undefined") {
  if (typeof module !== "undefined" && module.exports) {
    module.exports = {
      say,
    };
  }
}
