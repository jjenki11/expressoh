'use strict';

const Expressoh = require('../..');
var expressoh = new Expressoh();
var Mapper = expressoh.Mapper();
var Composer = expressoh.Composer();

let suite = [
  {
    name: 'Can fetch from http',
    tests: [
      {
        title: 'Can generator request', 
        conditions: require('./generatorData.json').map(Mapper.http)
      }
    ]
  }
];

Promise.resolve()
.then(Composer.create(suite))
.then(Composer.run())
.catch(err => console.log(`Error running composer... ${err}`))
