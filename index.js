'use strict';
// api
module.exports = class expressoh {
  constructor() { return this; }
  Collector() { return require('./lib/core/collector')(); }
  Generator() { return require('./lib/core/generator')(); }
  Validator() { return require('./lib/core/validator')(); }
  Composer() { return require('./lib/core/composer')(); }
  Mapper() { return require('./lib/core/mapper')(); }
};