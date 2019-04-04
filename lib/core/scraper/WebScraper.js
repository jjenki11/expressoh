'use strict';

const WebHelper = require('../../utils/WebHelper');
const BaseScraper = require('./BaseScraper');

module.exports = class WebScraper extends BaseScraper {
  constructor() {
    super('web');
    return this;
  }

  async testFacility(query) {
    let tt = this;
    return await new Promise((resolve, reject) => {
      Promise.resolve(query.driver.get(`${query.platform}`))
      .then(query.driver.sleep(query.delay))
      .then(() => query.driver.executeScript(WebHelper.cookieInjector, ['test_cookie']))
      .then((d) => {
        query.driver.close()
        resolve({body: d, status:200});
      })
      .catch(err => console.log(`error: ${err}`));
    });
  };

  async buildSteps(q) {
    return [
       await this.testFacility(q[0])
    ];
  };

  async collect(query) {
    return await new Promise(async (resolve, reject) => {
      let results = [];
      for (var v of this.execute(await this.buildSteps(query))) { results.push(...v) }
      resolve(results)
    });
  }
}