const process = require('process');
const path = require('path');
const fs = require('fs');

const { main = 'index.js' } = require(path.resolve('package.json'));
const mainPath = path.resolve(main);

const defaultOptions = {
    files: process.argv.slice(2).map(f => path.resolve(f)),
    args: fs.existsSync(mainPath) ? [require(mainPath)] : [],
    test: require('node:test'),
    assert: require('node:assert/strict'),
    helpers: undefined,
    window: globalThis.window
};

module.exports = () => (options = {}) => {

    const { files, args, test, assert, helpers, window } = { ...defaultOptions, ...options };

    files.forEach(async f => {
        const { default: ini } = await import(f);
        if (typeof ini !== 'function') return;
        const run = ini({ test, assert, helpers, window }, ...args);
        if (typeof run !== 'function') return;
        run(...args);
    });

};
