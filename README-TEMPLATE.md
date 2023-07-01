<%- lib.renderOpening() %>

## Install

<%- await lib.renderCode('npm install module-testrunner', 'sh', 'https://www.npmjs.com/package/module-testrunner') %>

## Usage

### CLI

```js
nmt test_files
```

### API

```js
const run = require('module-testrunner');
const options = { ... };
run(options);
```

## Options

`files`: Array of test file paths.
`args`: Array of custom test arguments. Default: Result of loading `main` from `package.json` or `./index.js`.
`test`: Function that runs a test. Default: Result of loading `node:test`.
`assert`: Assertion library. Default: Result of loading `node:assert`.
`context`: Additional context object to make accessible to each test.

## Example

```js
module.exports = ({ test, assert, context }) => args => {
    test('loads the app', () => {
        const app = args.load();
        assert(context.helpers.appLoaded(app));
    });
}
```
