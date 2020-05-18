say("Interface up and running.", console.log);

function say(sentence, sentenceCallback) {
  if (sentence != "") {
    responsiveVoice.speak(sentence, "UK English Male");
    if (sentenceCallback) sentenceCallback(sentence);
  }
}
