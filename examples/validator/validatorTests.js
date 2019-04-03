'use strict';

const Expressoh = require('../..');
var expressoh = new Expressoh();
var Mapper = expressoh.Mapper();
var Composer = expressoh.Composer();

let suite = [
  {
    name: 'Can Process tests',
    tests: [
      { title: 'Can validator process', conditions: ['phone', 'email', 'username'].map(Mapper.process) }
    ]
  },
  {
    name: 'Facility tests',
    tests: [
      { title: 'Facility should be found', conditions: require('./validatorData.json').map(Mapper.facility) }
    ]
  }
];

Promise.resolve()
.then(Composer.create(suite))
.then(Composer.run())
.catch(err => console.log(`Error running composer... ${err}`))