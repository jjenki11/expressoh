'use strict';

const nockRecord = require('nock-record');
const request = require('superagent');
const BaseGenerator = require('./BaseGenerator');

module.exports = class HttpGenerator extends BaseGenerator {

  constructor() {
    super('http');
    this.url = '';
    this.outFile = '';
    this.recorderArgs = { fixturePath: './examples/fixtures', mode: 'record' };
    return this;
  }

  async buildRecorder(args) {
    return await new Promise(async (resolve, reject) => {
      var recName = `${args.http.fixture}`;
      const record = nockRecord.setupRecorder(this.recorderArgs);
      const recording = await record(recName);
      const response = await request.get(`${args.http.url}${args.http.path}`);
      const out = { body: response.body, status: response.status };
      recording.completeRecording();
      recording.assertScopesFinished();
      resolve(out)
    });
  }

  async generate(query) {
    let results = [];
    for (var v of this.execute(await this.buildRecorder(query))) { results.push(v) }
    return await results
  }
  
}