'use strict';

const validator = require('validator');
const BaseValidator = require('./BaseValidator');

module.exports = class EmailValidator extends BaseValidator {
  constructor() {
    super('email');
    this.regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/; // RFC 5322
    this.minLength = 3;   // RFC 3696
    this.maxLength = 254; // RFC 5321
    return this;
  }

  buildRules(q) {
    return [
      (this.minLength <= q.length && this.maxLength >= q.length),
      this.regex.test(q),
      validator.isEmail(q)
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