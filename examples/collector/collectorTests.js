'use strict';
var expressoh = new (require('../..'))();
var Mapper = expressoh.Mapper();
var Composer = expressoh.Composer();
let suite = [
  {
    name: 'Can collect data',
    tests: [
      {
        title: 'Can collector collect',
        conditions: require('./collectorData.json').map(Mapper.web)
      }
    ]
  }
];
Composer.create(suite)
.then(Composer.run())
.catch(err => console.log(`Error running composer... ${err}`))