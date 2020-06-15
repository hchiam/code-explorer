let logger = console.log;
console.log = (...message) => {
  const responsiveVoiceIsRunning = message[0] && message[0].voiceURI;
  if (!responsiveVoiceIsRunning) {
    logger(...message);
  }
  // TODO: can read any regular console.log message here
};
let error = console.error;
console.error = (message) => {
  const responsiveVoiceIsRunning = message[0] && message[0].voiceURI;
  if (!responsiveVoiceIsRunning) {
    error(message);
  }
  // TODO: can read any regular console.log message here
};
