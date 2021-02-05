# Tiny Emitter

[![Build Status](https://img.shields.io/travis/lmk123/tinyemitter/master.svg?style=flat-square)](https://travis-ci.org/lmk123/tinyemitter)
[![Coverage Status](https://img.shields.io/coveralls/lmk123/tinyemitter/master.svg?style=flat-square)](https://coveralls.io/github/lmk123/tinyemitter?branch=master)
[![dependencies Status](https://img.shields.io/david/lmk123/tinyemitter.svg?style=flat-square)](https://david-dm.org/lmk123/tinyemitter)
[![devDependencies Status](https://img.shields.io/david/dev/lmk123/tinyemitter.svg?style=flat-square)](https://david-dm.org/lmk123/tinyemitter?type=dev)
[![NPM Version](https://img.shields.io/npm/v/tinyemitter.svg?style=flat-square)](https://www.npmjs.com/package/tinyemitter)

Yet another tiny event emitter libary.

## Install

### Use NPM

```
npm install tinyemitter
```

Then import it in your project:

```js
// ES6 module
import TinyEmitter from 'tinyemitter'

// Or CommonJS module
const TinyEmitter = require('tinyemitter')
```

### Use with &lt;script&gt;

Download tinyemitter.js from [unpkg](https://unpkg.com/tinyemitter)([min](https://unpkg.com/tinyemitter/dist/tinyemitter.min.js)), then:

```html
<script src="path/to/tinyemitter.js"></script>
<script>var e = new TinyEmitter()</script>
```

## Usage

```js
import TinyEmitter from 'tinyemitter'

const e = new TinyEmitter()

function handle (...names) {
  console.log(...names)
}

e.on('hello', handle)
e.emit('hello', 'Mike', 'Bob', 'Lucy')
e.off('hello', handle)
```

That's all.

## License

MIT
