'use strict';

const webScraper = require('./WebScraper');
const apiScraper = require('./ApiScraper');

module.exports = () => {
  return {
    use: {
      web: () => new webScraper(),
      api: () => new apiScraper()
    }
  }
}