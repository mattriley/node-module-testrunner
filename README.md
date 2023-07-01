# Module Testrunner

<p align="right"><code>24 sloc</code>&nbsp;<code>2 files</code>&nbsp;<code>0 deps</code>&nbsp;<code>9 dev deps</code></p>

Runs test files that export a top level function to enable initialisation.

<br />

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
## Table of Contents

- [Install](#install)
- [Usage](#usage)
- [Options](#options)
- [Example](#example)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Install

###### <p align="right"><a href="https://www.npmjs.com/package/module-testrunner">https://www.npmjs.com/package/module-testrunner</a></p>
```sh
npm install module-testrunner
```

## Usage

### CLI

```js
nmt test_files
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

}
```
