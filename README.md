# httpBuildQuery()

[![NPM Version](https://img.shields.io/npm/v/http-build-query.svg)](https://www.npmjs.com/package/http-build-query)
[![NPM Download](https://img.shields.io/npm/dm/http-build-query.svg)](https://www.npmjs.com/package/http-build-query)
[![License](https://img.shields.io/npm/l/http-build-query.svg)](https://github.com/vladzadvorny/http-build-query/blob/master/LICENSE)

Generate URL-encoded query string from the object (php's http_build_query() in JavaScript).

## Installation:

```sh
$ npm install http-build-query
```

## Usage:

```javascript
var httpBuildQuery = require('http-build-query');

// Simple using
var obj = {
  id: 777,
  message: 'hello',
  token: 'x2s7d'
};

httpBuildQuery(obj); // message=hello&id=777&token=x2s7d

// Example #3 http_build_query() with complex arrays
// from php documentation: http://php.net/manual/en/function.http-build-query.php
var obj2 = {
  user: {
    name: 'Bob Smith',
    age: 47,
    sex: 'M',
    dob: '5/12/1956'
  },
  pastimes: ['golf', 'opera', 'poker', 'rap'],
  children: {
    bobby: {
      age: 12,
      sex: 'M'
    },
    sally: {
      age: 8,
      sex: 'F'
    }
  },
  '+0': 'CEO'
};

httpBuildQuery(obj2, 'flags_');
```
