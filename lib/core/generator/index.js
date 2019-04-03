'use strict';
const httpGenerator = require('./HttpGenerator');
const webGenerator = require('./WebGenerator');

module.exports = () => {
  let self = {
    use: {
      http: () => new httpGenerator(),
      web: () => new webGenerator()
    }
  };
  return self;
};