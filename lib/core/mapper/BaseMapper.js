'use strict';

const Expressoh = require('../../..');
var expressoh = new Expressoh();
// generator interface
var eGenerator = expressoh.Generator();
// validator interface
var gValidator = expressoh.Validator();
// collector interface
var bCollector = expressoh.Collector();

module.exports = class BaseMapper {

  constructor() {
    return this;
  }

  process (p) {
    return ({
      'subject': p,
      'action': 'canProcess',
      'description': 'validator can process',
      'eval': gValidator.canProcess,
      'truth': true
    });
  }

  facility (f) {
    return ({
      'subject': f.facility,
      'action': `validate facility as ${f.valid ? 'legitimate' : 'invalid'} ${f.type}:`,
      'description': `${f.type} validation succeeded`,
      'eval': async (d) => await gValidator.use[f.type]()
                            .validate(d),
      'truth': f.valid
    });
  }

  http (h) {
    return ({
      'subject': h,
      'action': `validate http as ${h.valid ? 'legitimate' : 'invalid'} ${h.type}`,
      'description': `generator can request ${h.type} ... ${h.http.method} : ${h.http.url}${h.http.path}`,
      'eval': async (d) => await gValidator.use[h.type]()
                            .validate(await eGenerator.use[h.type]()
                              .generate(d)),
      'truth': h.valid
    });
  }

  web (b) {
    return ({
      'subject': b,
      'action': `collecting from ${b.type} should ${b.valid ? 'succeed' : 'fail'} ${b.type}`,
      'description': `collector can perform ${b.type} collection from ${b.platform} with ${b.facilityType} => <${b.facility}>`,
      'eval': async (d) => await gValidator.use[b.type]()
                            .validate(await bCollector.use[b.type]()
                              .collect(await eGenerator.use[b.type]()
                                .generate(d))),
      'truth': b.valid
    });
  }

}