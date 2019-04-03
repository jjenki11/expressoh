'use strict';

var expect = require('chai')
  .use(require('chai-as-promised'))
  .expect;

class suite {
  constructor() {
    this._groups = {};
  }

  get groups(){ return this._groups; }
  set groups(g){ this._groups = g; }

  create(gps){
    let tasks = [];
    gps.forEach((g) => {
      let newg = new group();
      newg.create(g.name);
      newg.addTests(g.tests);
      //tasks.push(this.createGroup(g))
      tasks.push(newg);
    });
    return Promise.all(tasks).catch(err => console.log(`Error creating multiple groups. ${err}`))
  }

  run() {
    let tt = this;
    before(function () {
      return Promise.resolve()
        .then(function () {
          Object.keys(tt.groups).forEach(function (gn) {
            describe(gn, function () {
              //tt.testGroup(gn)
              tt.groups[gn].run()
            });
          });
        })
    })
  }
}

class group {
  constructor() {
    this._name = '';
    this._tests = [];
  }
  // getters
  get name() { return this._name; }
  get tests() { return this._tests; }
  // setters
  set name(n) { this._name = n; }
  set tests(n) { this._tests = n; }

  create(n){
    return new Promise((resolve, reject) => {
      this.name = n;
      resolve(n);
    });
  }

  addTests(tests) {
    tests.forEach((t) => {
      let newt = new test();
      newt.create(t);
      this.tests.push(newt);
    });
    return Promise.all(this.tests).catch(err => console.log(`Error adding to group. ${err}`))
  }

  run() {
    let tt = this;
    before(function () {
      return Promise.resolve()
        .then(async function () {
          await Object.keys(tt.tests).forEach(function (test) { describe(test.title, function () { test.run() }) })
        })
    });
  }
}

// create a test and run it
class test {

  constructor() {
    this._title = '';
    this._testActions = [];
    return this;
  }

  // getters
  get title() { return this._title; }
  get testActions() { return this._testActions; }
  // setters
  set title(t) { this._title = t; }
  set testActions(t) { this._testActions = t; }

  // create a test
  create(p){
    let tt = this;
    return new Promise((resolve, reject) => {
      tt.title = p.title;
      p.conditions.forEach((pc) => {
        let r = new rule();
        r.create(pc);
        tt.testActions.push(r);
      });
      resolve(tt.title = p.title);
    });
  }

  // run a test
  run(){
    let tt = this;
    return new Promise((resolve, reject) => {
      let subtests = [];
      for (var act of tt.evalList([...tt.testActions])) { subtests.push(act) }
      resolve(subtests);
    });
  }

  // generator function to iterate all args for test
  *evalList() {
    yield* Array.from(arguments);
  }
}

// create a rule
class rule {

  constructor() {
    return this;
  }

  create(c) {
    return new Promise((resolve, reject) => {
      describe(`${c.action} ${c.subject}`, function () {
        it(c.description, async function () {
          resolve(expect(await c.eval(c.subject)).to.be[c.truth])
        })
      })
    })
  }
}

// wrapper to create suite/groups/tests/rules and run suite
module.exports = class composer {

  constructor() {
    this.suite = null;
    return this;
  }

  create(data) {
    let tt = this;
    return new Promise((resolve, reject) => {
      tt.suite = new suite();
      tt.suite.create(data);
      resolve();
    });
  }

  run() {
    let tt = this;
    return new Promise((resolve, reject) => {
      tt.suite.run();
      resolve();
    });
  }
}