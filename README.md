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

// Example #3 http_build_query() with complex arrays
// from php documentation: http://php.net/manual/en/function.http-build-query.php
const obj2 = {
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
    '+0': 'CEO' // '+' is hack :)
  };

httpBuildQuery(obj2, 'flags_'); 
```

![Tests](https://raw.githubusercontent.com/vladzadvorny/http-build-query/master/tests/tests.png "Result Example #3 http_build_query()")