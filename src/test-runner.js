const fs = require('node:fs');
const path = require('node:path');
const defaultOptions = require('./default-options');
const { main } = require(path.resolve('package.json'));

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
        const init = await loadModuleDefault(f);
        if (typeof init !== 'function') return;
        const compose = await loadCompose();
        const main = await loadMain();
        const run = await init({ test, assert, main, compose }, context, ...args);
        if (typeof run !== 'function') return;
        await run(...args);
    });

};
