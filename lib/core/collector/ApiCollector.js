'use strict';

const BaseCollector = require('./BaseCollector');

module.exports = class ApiCollector extends BaseCollector {
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