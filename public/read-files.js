const fs = require("fs");

function readJson(filePath) {
  filePath = filePath.toString();
  if (filePath.endsWith(".json")) {
    const data = JSON.parse(readFile(filePath, "utf8"));
    console.log(data);
  } else {
    console.log(`Is file ${filePath} a JSON file?`);
  }
}

function readFile(filePath) {
  return fs.readFileSync(filePath, "utf8");
}

if (typeof exports !== "undefined") {
  if (typeof module !== "undefined" && module.exports) {
    module.exports = {
      readJson,
      readFile,
    };
  }
}
