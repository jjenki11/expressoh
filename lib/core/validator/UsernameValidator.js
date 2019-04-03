'use strict';

const BaseValidator = require('./BaseValidator');

module.exports = class UsernameValidator extends BaseValidator {
  constructor() {
    super('username');
    this.minLength = 1;   // RFC 3696
    this.maxLength = 128; // RFC 5321
    this.regex = /^[a-zA-z0-9]{1,}/;  // not sure how reliable this is
    return this;
  }

  buildRules(q) {
    return [
      (this.minLength <= q.length),
      (this.maxLength >= q.length),
      this.regex.test(q)
    ];
  }

  validate(query) {
    return new Promise((resolve, reject) => {
      let results = [];
      for (var v of this.execute(this.buildRules(query))) { results.push(...v) }
      resolve((results.indexOf(false) !== -1) ? false : true)
    });
  }
}