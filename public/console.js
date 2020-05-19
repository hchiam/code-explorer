let logger = console.log;
console.log = (message, flag) => {
  if (flag) logger(message);
};
