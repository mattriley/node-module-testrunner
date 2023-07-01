const process = require('node:process');
const path = require('node:path');
const fs = require('node:fs');

const { main = 'index.js' } = require(path.resolve('package.json'));
const mainPath = path.resolve(main);

const defaultOptions = {
    files: process.argv.slice(2).map(f => path.resolve(f)),
    args: fs.existsSync(mainPath) ? [require(mainPath)] : [],
    test: require('node:test'),
    assert: require('node:assert/strict'),
    context: {}
};

module.exports = (options = {}) => {

    const { files, args, test, assert, context } = { ...defaultOptions, ...options };

    files.forEach(async f => {
        const { default: ini } = await import(f);
        if (typeof ini !== 'function') return;
        const run = ini({ test, assert }, context, ...args);
        if (typeof run !== 'function') return;
        run(...args);
    });

};
