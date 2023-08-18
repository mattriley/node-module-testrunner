const process = require('node:process');
const path = require('node:path');
const fs = require('node:fs');
const { main } = require(path.resolve('package.json'));

const defaultOptions = {
    files: process.argv.slice(2).map(f => path.resolve(f)),
    test: require('node:test'),
    assert: require('node:assert/strict'),
    context: {},
    args: []
};

const loadModuleDefault = async modulePath => {
    try {
        return require(modulePath);
    } catch (err) {
        if (err.code === 'ERR_REQUIRE_ESM') return import(modulePath).then(m => m.default);
        throw err;
    }
};

const loadMain = () => {
    if (!main) return null;
    return loadModuleDefault(path.resolve(main));
};

const loadCompose = () => {
    const search = ['js', 'cjs', 'mjs'].map(ext => path.resolve(`./src/compose.${ext}`));
    const match = search.find(f => fs.existsSync(f));
    return match ? loadModuleDefault(match) : null;
};

module.exports = (options = {}) => {

    const { files, test, assert, context, args } = { ...defaultOptions, ...options };

    files.forEach(async f => {
        const ini = await loadModuleDefault(f);
        console.warn(ini);
        if (typeof ini !== 'function') return;
        const compose = await loadCompose();
        const main = await loadMain();
        const run = ini({ test, assert, main, compose }, context, ...args);
        if (typeof run !== 'function') return;
        run(...args);
    });

};
