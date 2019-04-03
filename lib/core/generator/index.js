'use strict';
const httpGenerator = require('./HttpGenerator');

module.exports = () => {
    let self = {
        use: {
            http: () => new httpGenerator()
        }
    };
    return self;
};