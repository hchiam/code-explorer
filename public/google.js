const request = require("request");
const cheerio = require("cheerio");

// (async function () {
//   console.log(await google("js sort backwards"));
// })();

async function google(what) {
  const url = `https://www.google.com/search?q=${what}`;
  async function doRequest(url) {
    return new Promise(function (resolve, reject) {
      const howManyResults = 3;
      const searchResults = []; // {header:'', link:'', description:''}
      request(url, function (err, res, bod) {
        const body = cheerio.load(bod);
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
        resolve(searchResults);
      });
    });
  }
  return await doRequest(url);
}
