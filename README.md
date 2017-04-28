# server-timestamp
[![NPM Version][npm-image]][npm-url]
[![NPM Downloads][downloads-image]][downloads-url]

Create a middleware to add a server timestamp header in milliseconds. Use for Express

## Installation

This is a [Node.js](https://nodejs.org/en/) module available through the
[npm registry](https://www.npmjs.com/). Installation is done using the
[`npm install` command](https://docs.npmjs.com/getting-started/installing-npm-packages-locally):

```sh
$ npm install --save server-timestamp
```

## API

```js
var serverTimestamp = require('server-timestamp');
```
### serverTimestamp([options])

Create a middleware that adds a `X-Server-Timestamp` header to responses. If
you don't want to use this module to automatically set a header, please
see the section about [`Options format`](#format)

#### Options

The `serverTimestamp` function accepts an optional `options` object that may
contain any of the following keys:

##### header

The name of the header to set, defaults to X-Server-Timestamp.

##### format

This is a function that formats timestamps.

## Examples

### default

```js
var serverTimestamp = require('./');
var express = require('express');
var app = express();

app.use(serverTimestamp());

// response
app.get('/', function (req, res) {
    /*
     res results:

       {
         "x-powered-by": "Express",
         "x-server-timestamp": 1493365865576
       }
     */
    res.send(res._headers)
});

app.listen(3000, function () {
    console.log('Example app listening on port 3000!')
});
```

### set header

```js
var serverTimestamp = require('./');
var express = require('express');
var app = express();

app.use(serverTimestamp({header: 'Example-Server-Timestamp'}));

// response
app.get('/', function (req, res) {
    /*
     res results:

       {
         "x-powered-by": "Express",
         "example-server-timestamp": 1493365865576
       }
     */
    res.send(res._headers)
});

app.listen(3000, function () {
    console.log('Example app listening on port 3000!')
});
```

### set header and format

```js
var serverTimestamp = require('./');
var express = require('express');
var app = express();

app.use(serverTimestamp({
    header: 'Example-Format-Server-Timestamp',
    format: function(timestamp){
        var now = new Date(timestamp);
        var year = now.getFullYear();
        var month = now.getMonth() + 1;
        var date = now.getDate();
        var hour = now.getHours();
        var minute = now.getMinutes();
        var second = now.getSeconds();

        return year + '-' + month + '-' + date + ' '+ hour + ':' + minute + ':' + second;
    }
}));

// response
app.get('/', function (req, res) {
    /*
     res results:

       {
         "x-powered-by": "Express",
         "example-format-server-timestamp": "2017-4-28 15:51:5"
       }
     */
    res.send(res._headers)
});

app.listen(3000, function () {
    console.log('Example app listening on port 3000!')
});
```

## Full Example
Check [this repo](https://github.com/SunilWang/server-timestamp/blob/master/example.js) for full example with `Express`.

## License

[MIT](LICENSE)

[npm-image]: https://img.shields.io/npm/v/server-timestamp.svg
[npm-url]: https://www.npmjs.com/package/server-timestamp
[downloads-image]: https://img.shields.io/npm/dt/server-timestamp.svg
[downloads-url]: https://npmjs.org/package/server-timestamp