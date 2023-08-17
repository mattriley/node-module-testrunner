const process = require('node:process');
const path = require('node:path');
const fs = require('node:fs');
const { main } = require(path.resolve('package.json'));

const defaultOptions = {
    files: process.argv.slice(2).map(f => path.resolve(f)),
    test: require('node:test'),
    assert: require('node:assert/strict'),
    context: {}
};

const loadModule = modulePath => {
    try {
        return require(modulePath);
    } catch (err) {
        if (err.code === 'ERR_REQUIRE_ESM') return import(modulePath);
        throw err;
    }
};

const loadMain = () => {
    if (!main) return null;
    return loadModule(path.resolve(main));
};

const loadCompose = () => {
    const search = ['js', 'cjs', 'mjs'].map(ext => path.resolve(`./compose.${ext}`));
    const match = search.find(f => fs.existsSync(f));
    return match ? loadModule(match) : null;
};

module.exports = () => (options = {}) => {

    const { files, args, test, assert, context } = { ...defaultOptions, ...options };

    files.forEach(async f => {
        const ini = await loadModule(f);
        if (typeof ini !== 'function') return;
        const compose = await loadCompose();
        const main = await loadMain();
        const run = ini({ test, assert, main, compose }, context, ...args);
        if (typeof run !== 'function') return;
        run(...args);
    });

};
