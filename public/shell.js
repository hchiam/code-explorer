// avoid undefined if require() is undefined:
let execSync;
if (typeof require !== "undefined") {
  execSync = require("child_process").execSync;
}

function runShellCommand(command) {
  console.log("Running " + command);
  const output = execSync(command, { encoding: "utf-8" }); // the default is 'buffer'
  console.log(`\n\nShell output:\n\n${output}\n\n`);
  return output;
}

async function sendShellCommand(command, callback) {
  const response = await fetch("/shell", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ command }),
  });
  const statusText = await response.statusText;
  if (callback) callback(statusText);
  return statusText;
}

if (typeof exports !== "undefined") {
  if (typeof module !== "undefined" && module.exports) {
    module.exports = {
      runShellCommand,
      sendShellCommand,
    };
  }
}
