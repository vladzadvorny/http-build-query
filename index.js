var esc = function(param) {
  return encodeURIComponent(param)
    .replace(/[!'()*]/g, escape)
    .replace(/%20/g, '+');
};

var isNumeric = function(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
};

var cleanArray = function(actual) {
  var newArray = new Array();
  for (var i = 0; i < actual.length; i++) {
    if (actual[i]) {
      newArray.push(actual[i]);
    }
  }
  return newArray;
};

var httpBuildQuery = function(queryData, numericPrefix, argSeparator, tempKey) {
  numericPrefix = numericPrefix || null;
  argSeparator = argSeparator || '&';
  tempKey = tempKey || null;

  if (!queryData) {
    return '';
  }

  var query = Object.keys(queryData).map(function(k) {
    var res;
    var key = k;

    if (tempKey) {
      key = tempKey + '[' + key + ']';
    }

    if (typeof queryData[k] === 'object' && queryData[k] !== null) {
      res = httpBuildQuery(queryData[k], null, argSeparator, key);
    } else {
      if (numericPrefix) {
        key = isNumeric(key) ? numericPrefix + Number(key) : key;
      }

      var val = queryData[k];

      val = val === true ? '1' : val;
      val = val === false ? '0' : val;
      val = val === 0 ? '0' : val;
      val = val || '';

      res = esc(key) + '=' + esc(val);
    }

    return res;
  });

  return cleanArray(query)
    .join(argSeparator)
    .replace(/[!'()*]/g, '');
};

module.exports = httpBuildQuery;
