const execSync = require("child_process").execSync;

function runShellCommand(command) {
  const output = execSync(command, { encoding: "utf-8" }); // the default is 'buffer'
  console.log(`\n\nShell output:\n\n${output}\n\n`);
  return output;
}

async function sendShellCommand(command) {
  const statusText = await fetch("/shell", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ command: command }),
  }).then((res) => {
    console.log(res);
    return res.statusText;
  });
  return statusText;
}

if (typeof exports !== "undefined") {
  if (typeof module !== "undefined" && module.exports) {
    module.exports = { runShellCommand, sendShellCommand };
  }
}
