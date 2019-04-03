'use strict';
const BaseValidator = require('./BaseValidator');
const libphonenumber = require('libphonenumber-js');

module.exports = class PhoneValidator extends BaseValidator {
  constructor() {
    super('phone');
    this.rule = []; // tbd?
    return this;
  }

  isInternationalPhone(query) {
    let checkInternational = false;
    try {
      checkInternational = libphonenumber.isValidNumber(
        libphonenumber.format(
          libphonenumber.parse(
            (query.search(new RegExp(/\+/, '')) === -1) ? '+' + query : query)
          , 'E.164'));
    } catch (e) { checkInternational = false; }
    return checkInternational;
  }

  isDomesticPhone(query) {
    let checkFormatted = false;
    try {
      checkFormatted = libphonenumber.isValidNumber(
        libphonenumber.parsePhoneNumberFromString(query, 'US').number);
    } catch (e) {
      checkFormatted = false;
    }
    return checkFormatted;
  }

  buildRules(q) {
    return [
      this.isDomesticPhone(q),
      this.isInternationalPhone(q)
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