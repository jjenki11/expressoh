'use strict';
//const  = require('./BaseCollector');
const webCollecter = require('./WebCollector');
const apiCollector = require('./ApiCollector');

module.exports = () => {
  return {
    use: {
      web: () => new webCollecter(),
      api: () => new apiCollector()
    }
  }
}