'use strict';

const _ = require('lodash');
const BaseValidator = require('./BaseValidator');

module.exports = class HttpValidator extends BaseValidator {

  constructor() {
    super('http');
    return this;
  }

  isNotEmpty(q) { return !(_.isEmpty(q)) }

  isStatus200(q) { return parseInt(q['status']) === 200; }

  buildRules(q) {
    return [
      this.isNotEmpty(q),
      this.isStatus200(q)
    ];
  }

  validate(query) {
    return new Promise((resolve, reject) => {
      let results = [];
      for (var v of this.execute(this.buildRules(query[0]))) { results.push(...v) }
      resolve((results.indexOf(false) !== -1) ? false : true)
    });
  }

}