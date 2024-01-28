const config = require("../config");

/** @type {typeof import('./en')} */
const lang = require(`./${config.lang}`);

module.exports = lang;
