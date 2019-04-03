'use strict';

var webdriver = require('selenium-webdriver'),
                By = webdriver.By,
                until = webdriver.until;

var chrome = require('selenium-webdriver/chrome');
var path = require('chromedriver').path;
const BaseGenerator = require('./BaseGenerator');

module.exports = class WebGenerator extends BaseGenerator {

  constructor() {
    super('web');
    this.url = '';
    this.browserArgs = { };
    return this;
  }

  async buildBrowser(args) {
    return await new Promise(async (resolve, reject) => {
      const wdriver = new webdriver.Builder()
                          .withCapabilities(webdriver.Capabilities.chrome())
                          .build();
      let resp = {
        driver: wdriver,
        platform: args.platform,
        facility: args.facility,
        facilityType: args.facilityType,
        valid: args.valid,
        type: args.type
      };
      resolve(resp)
    });
  }

  async generate(query) {
    let results = [];
    for (var v of this.execute(await this.buildBrowser(query))) { results.push(v) }
    return await results
  }

}
