'use strict';
var expressoh = new (require('../..'))();
var Mapper = expressoh.Mapper();
var Composer = expressoh.Composer();
var suite = [
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
Composer.create(suite)
.then(Composer.run())
.catch(err => console.log(`Error running composer... ${err}`));