'use strict';
var expressoh = new (require('../..'))();
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
Composer.create(suite)
.then(Composer.run())
.catch(err => console.log(`Error running composer... ${err}`))