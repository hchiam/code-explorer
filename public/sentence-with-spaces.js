// 'checkValidityOf2Words'.replace(/([a-z\d])([A-Z])/g, '$1 $2').replace(/([a-zA-Z])(\d)/g, '$1 $2').toLowerCase()
function addSpaces(sentenceWithoutSpaces) {
  return sentenceWithoutSpaces
    .replace(/([a-z\d])([A-Z])/g, "$1 $2") // aB -> a B ; 1D -> 1 D
    .replace(/([a-zA-Z])(\d)/g, "$1 $2") // a1 -> a 1
    .toLowerCase(); // just for consistency
}

if (typeof exports !== "undefined") {
  if (typeof module !== "undefined" && module.exports) {
    module.exports = {
      addSpaces,
    };
  }
}
