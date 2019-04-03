'use strict';

const Expressoh = require('../../..');
var expressoh = new Expressoh();
// generator interface
var eGenerator = expressoh.Generator();
// validator interface
var gValidator = expressoh.Validator();

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
      'action': `validate as ${f.valid ? 'legitimate' : 'invalid'} ${f.type}:`,
      'description': `${f.type} validation succeeded`,
      'eval': (d) => gValidator.use[f.type]().validate(d),
      'truth': f.valid
    });
  }

  http (h) {
    return ({
      'subject': h,
      'action': `validate as ${h.valid ? 'legitimate' : 'invalid'} ${h.type}`,
      'description': `generator can request ${h.type} ... ${h.http.method} : ${h.http.url}${h.http.path}`,
      'eval': async (d) => await gValidator.use[h.type]().validate(await eGenerator.use[h.type]().generate(d)),
      'truth': h.valid
    });
  }


/*   process: (p) => ({
    'subject': p,
    'action': 'canProcess',
    'description': 'validator can process',
    'eval': gValidator.canProcess,
    'truth': true
  }),

  facility: (f) => ({
    'subject': f.facility,
    'action': `validate as ${f.valid ? 'legitimate' : 'invalid'} ${f.type}:`,
    'description': `${f.type} validation succeeded`,
    'eval': (d) => gValidator.use[f.type]().validate(d),
    'truth': f.valid
  }),

  http: (h) => ({
    'subject': h,
    'action': `validate as ${h.valid ? 'legitimate' : 'invalid'} ${h.type}`,
    'description': `generator can request ${h.type} ... ${h.http.method} : ${h.http.url}${h.http.path}`,
    'eval': async (d) => await gValidator.use[h.type]().validate(await eGenerator.use[h.type]().generate(d)),
    'truth': h.valid
  }) */

}