var esc = function(param) {
  return encodeURIComponent(param)
    .replace(/[!'()*]/g, escape)
    .replace(/%20/g, '+');
};

var isNumeric = function(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
};

var httpBuildQuery = function(queryData, numericPrefix, argSeparator, tempKey) {
  numericPrefix = numericPrefix || null;
  argSeparator = argSeparator || '&';
  tempKey = tempKey || null;

  var query = Object.keys(queryData).map(k => {
    var res;
    var key = k;

    if (tempKey) {
      key = tempKey + '[' + key + ']';
    }

    if (typeof queryData[k] === 'object') {
      res = httpBuildQuery(queryData[k], null, argSeparator, key);
    } else {
      if (numericPrefix) {
        key = isNumeric(key) ? numericPrefix + Number(key) : key;
      }
      res = esc(key) + '=' + esc(queryData[k]);
    }

    return res;
  });

  return query.join(argSeparator).replace(/[!'()*]/g, '');
};

module.exports = httpBuildQuery;
