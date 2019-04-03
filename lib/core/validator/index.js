'use strict';
const emailValidator = require('./EmailValidator');
const phoneValidator = require('./PhoneValidator');
const usernameValidator = require('./UsernameValidator');
const httpValidator = require('./HttpValidator');

module.exports = () => {
    let self = {
        canProcess: (input) => {
            return new Promise(function (res, rej) { res(self.use[input] ? true : false); });
        },
        use: {
            phone: () => new phoneValidator(),
            email: () => new emailValidator(),
            username: () => new usernameValidator(),
            http: () => new httpValidator()
        }
    };
    return self;
};