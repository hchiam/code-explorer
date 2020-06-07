let logger = console.log;
console.log = (message, flag) => {
  if (flag) logger(message);
  // can read any regular console.log message here
};
