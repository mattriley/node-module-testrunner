const process = require('node:process');
const path = require('node:path');
const assert = require('node:assert/strict');
const { test, mock } = require('node:test');

module.exports = {
    files: process.argv.slice(2).map(f => path.resolve(f)),
    test, mock, assert,
    context: {}, args: []
};
