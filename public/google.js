const axios = require("axios");
const cheerio = require("cheerio");

// Example usage:

// (async function () {
//   const query = "js sort backwards";
//   let queryBiasedToJs = query;
//   function biasToJs() {
//     const words = queryBiasedToJs.split(" ");
//     const hasJs = words.some(
//       (w) => w.toLowerCase() === "js" || w.toLowerCase() === "javascript"
//     );
//     if (hasJs) return;
//     queryBiasedToJs = "js " + queryBiasedToJs;
//   }
//   biasToJs();
//   console.log(await google(queryBiasedToJs));
// })();

async function google(what) {
  const url = `https://www.google.com/search?q=${what}`;
  try {
    const html = await axios.get(url);
    const howManyResults = 3;
    const searchResults = []; // {header:'', link:'', description:''}
    const body = await cheerio.load(html.data);
    body("h3")
      .slice(0, howManyResults)
      .each(function () {
        const header = body(this);
        const headerText = header.text();
        const link = header.parent();
        const linkText = "https://www.google.com/" + link.attr("href");
        const descriptionSelector = "div.BNeawe div.BNeawe";
        const description = header
          .parent()
          .parent()
          .siblings()
          .find(descriptionSelector);
        const descriptionText = description.text();
        const searchResult = {
          header: headerText,
          link: linkText,
          description: descriptionText,
        };
        searchResults.push(searchResult);
      });
    return searchResults;
  } catch (error) {
    return error;
  }
}

if (typeof exports !== "undefined") {
  if (typeof module !== "undefined" && module.exports) {
    module.exports = {
      google,
    };
  }
}
