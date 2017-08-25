var httpBuildQuery = require('../index');
var assert = require('assert');

describe('Using http-build-query', function() {
  it('Simple using', function() {
    var expectedResult = 'message=hello&id=777&token=x2s7d';
    var result = httpBuildQuery({
      message: 'hello',
      id: '777',
      token: 'x2s7d'
    });
    assert(result === expectedResult);
  });

  it('Example #3 http_build_query() from php documentation', function() {
    var expectedResult =
      'user%5Bname%5D=Bob+Smith&user%5Bage%5D=47&user%5Bsex%5D=M&user%5Bdob%5D=5%2F12%2F1956&pastimes%5B0%5D=golf&pastimes%5B1%5D=opera&pastimes%5B2%5D=poker&pastimes%5B3%5D=rap&children%5Bbobby%5D%5Bage%5D=12&children%5Bbobby%5D%5Bsex%5D=M&children%5Bsally%5D%5Bage%5D=8&children%5Bsally%5D%5Bsex%5D=F&flags_0=CEO';
    var data = {
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
    var result = httpBuildQuery(data, 'flags_');
    assert(result === expectedResult);
  });
});
