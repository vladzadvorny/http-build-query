# httpBuildQuery() 

Generate URL-encoded query string from the object (php's http_build_query() in js).

#### Installation:

```sh
$ npm install http-build-query
```

#### Example:

```javascript
const httpBuildQuery = require('http-build-query');

// Simple using
const obj = {
    message: 'hello',
    id: '777',
    token: 'x2s7d'
  };

httpBuildQuery(obj); // message=hello&id=777&token=x2s7d
```