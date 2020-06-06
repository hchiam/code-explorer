const { runShellCommand, sendShellCommand } = require("../public/shell.js");

// NOTE: sendShellCommand uses fetch, which is not available in Node

test("runShellCommand and sendShellCommand are defined", async function () {
  expect(typeof runShellCommand).toBe("function");
  expect(typeof sendShellCommand).toBe("function");
});

test("runShellCommand", async function () {
  const output = await runShellCommand("echo hi");
  expect(output).toBe("hi\n");
});
