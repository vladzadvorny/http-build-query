# httpBuildQuery()

[![NPM Version](https://img.shields.io/npm/v/http-build-query.svg)](https://www.npmjs.com/package/http-build-query)
[![NPM Download](https://img.shields.io/npm/dm/http-build-query.svg)](https://www.npmjs.com/package/http-build-query)
[![License](https://img.shields.io/npm/l/http-build-query.svg)](https://github.com/vladzadvorny/http-build-query/blob/master/LICENSE)
[![Node.js Version](https://img.shields.io/node/v/http-build-query.svg)](https://nodejs.org)
[![Build Status](https://img.shields.io/github/actions/workflow/status/vladzadvorny/http-build-query/test.yml?branch=master)](https://github.com/vladzadvorny/http-build-query/actions)

Generate URL-encoded query string from the object (PHP's `http_build_query()` in JavaScript). Compatible with Node.js ≥6 and modern browsers.

## Features

- **PHP Compatibility**: Implements PHP's `http_build_query()` function behavior in JavaScript
- **Nested Structures**: Handles nested objects and arrays with proper bracket notation
- **Type Handling**: Correctly converts booleans (`true` → `"1"`, `false` → `"0"`), numbers, strings, `null`, and `undefined`
- **Customizable**: Supports numeric prefix, custom argument separator, and nested key formatting
- **Browser & Node.js**: Works in both browser and Node.js environments
- **Zero Dependencies**: Lightweight with no external dependencies

## Installation

```sh
npm install http-build-query
```

Or using yarn:

```sh
yarn add http-build-query
```

For browser usage, include via CDN:

```html
<script src="https://unpkg.com/http-build-query"></script>
```

## API

### `httpBuildQuery(queryData, numericPrefix, argSeparator, tempKey)`

#### Parameters

- `queryData` (Object): The data to convert to query string
- `numericPrefix` (String|null): Prefix for numeric keys (default: `null`)
- `argSeparator` (String): Separator between arguments (default: `"&"`)
- `tempKey` (String|null): Temporary key for nested objects (used internally for recursion)

#### Returns

- (String): URL-encoded query string

## Usage Examples

### Basic Usage

```javascript
var httpBuildQuery = require("http-build-query");

var data = {
  name: "John Doe",
  age: 30,
  active: true,
};

var query = httpBuildQuery(data);
// Result: "name=John+Doe&age=30&active=1"
```

### Numeric Prefix

```javascript
var data = {
  0: "value1",
  1: "value2",
  key: "value3",
};

var query = httpBuildQuery(data, "prefix_");
// Result: "prefix_0=value1&prefix_1=value2&key=value3"
```

### Custom Argument Separator

```javascript
var data = { a: 1, b: 2, c: 3 };

var query = httpBuildQuery(data, null, ";");
// Result: "a=1;b=2;c=3"

var query2 = httpBuildQuery(data, null, "&");
// Result: "a=1&b=2&c=3"
```

### Complex Example (PHP Documentation Example)

```javascript
var data = {
  user: {
    name: "Bob Smith",
    age: 47,
    sex: "M",
    dob: "5/12/1956",
  },
  pastimes: ["golf", "opera", "poker", "rap"],
  children: {
    bobby: { age: 12, sex: "M" },
    sally: { age: 8, sex: "F" },
  },
  "+0": "CEO",
};

var query = httpBuildQuery(data, "flags_");
// Result matches PHP's http_build_query() output
```

## Browser Usage

### Direct Include

```html
<script src="https://unpkg.com/http-build-query"></script>
<script>
  var data = { q: "search term", page: 1 };
  var query = httpBuildQuery(data);
  console.log(query); // "q=search+term&page=1"
</script>
```

## Migration from Older Versions

Version 0.8.0 maintains full backward compatibility with previous versions. The only changes are internal improvements:

- Added `"use strict"` directive
- Improved code readability and documentation
- Updated dependencies
- Same API and behavior

## License

MIT © Vlad Zadvorny
