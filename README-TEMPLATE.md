<%- lib.renderOpening() %>

## Install

<%- await lib.renderCode('npm install module-testrunner', 'sh', 'https://www.npmjs.com/package/module-testrunner') %>

## Usage

### CLI

```js
npx test test_files
```

### API

```js
const { run } = require('module-testrunner');
const options = { ... };
run(options);
```

## Options

- `files`: Array of test file paths.
- `args`: Array of custom test arguments. Default: Result of loading `main` from `package.json` or `./index.js`.
- `test`: Function that runs a test. Default: Result of loading `node:test`.
- `assert`: Assertion library. Default: Result of loading `node:assert`.
- `context`: Additional context object to make accessible to each test.

## Example

### Basic

```js
module.exports = ({ test, assert }) => {

    test('it passes', () => {
        assert(true);
    });

};
```

### Advanced

```js
module.exports = ({ test, assert, context }) => args => {

    test('initialises the app', () => {
        const app = args.initialise();
        assert(context.helpers.appInitialised(app));
    });

};
```
