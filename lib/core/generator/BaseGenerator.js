'use strict';

module.exports = class BaseGenerator {

  constructor(t) {
    this._type = t;
    return this;
  }

  // getters
  get input() { return this._input; }
  get output() { return this._output; }
  get type() { return this._type; }

  // setters
  set input(i) { this._input = i; }
  set output(o) { this._output = o; }
  set type(t) { this._type = t; }

  // generator to execute array of recorders
  *execute() { yield* Array.from(arguments); }
}

