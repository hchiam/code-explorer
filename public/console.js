let logger = console.log;
console.log = (message) => {
  if (!responsiveVoiceIsRunning || consoleLogOverride) {
    logger(message);
  }
  // TODO: can read any regular console.log message here
};
let error = console.error;
console.error = (message) => {
  if (!responsiveVoiceIsRunning || consoleLogOverride) {
    error(message);
  }
  // TODO: can read any regular console.log message here
};
