'use strict';

const BaseScraper = require('./BaseScraper');

module.exports = class ApiScraper extends BaseScraper {
  constructor() {
    super('api');
    return this;
  }

  buildRules(q) {
    return [];
  }

  collect(query) {
    return new Promise((resolve, reject) => {
      //let results = [];
      //for (var v of this.execute(this.buildRules(query))) { results.push(...v) }
      //resolve((results.indexOf(false) !== -1) ? false : true)
      resolve(query?true:false);
    });
  }
}