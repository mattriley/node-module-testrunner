const path = require('path');
const process = require('process');
const { main = 'index.js' } = require(path.resolve('package.json'));

const defaultOptions = {
    testTarget: require(path.resolve(main)),
    testFiles: process.argv.slice(2).map(f => path.resolve(f)),
    test: require('node:test'),
    assert: require('node:assert/strict')
};

module.exports = () => (options = {}) => {

    const { testTarget, testFiles, test, assert } = { ...defaultOptions, ...options };

    testFiles.forEach(f => {
        const ini = require(f);
        if (typeof ini !== 'function') return;
        const run = ini({ test, assert }, testTarget);
        if (typeof run !== 'function') return;
        run(testTarget);
    });

};
