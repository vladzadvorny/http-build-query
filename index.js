"use strict";

/**
 * Encode a parameter for URL query string
 * @param {string} param - Parameter to encode
 * @returns {string} Encoded parameter
 */
function encodeParam(param) {
  return encodeURIComponent(param)
    .replace(/[!'()*]/g, escape)
    .replace(/\*/g, "%2A")
    .replace(/%20/g, "+");
}

/**
 * Check if a value is numeric
 * @param {*} n - Value to check
 * @returns {boolean} True if numeric
 */
function isNumeric(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}

/**
 * Filter out falsy values from array
 * @param {Array} arr - Array to clean
 * @returns {Array} Cleaned array
 */
function cleanArray(arr) {
  var result = [];
  for (var i = 0; i < arr.length; i++) {
    if (arr[i]) {
      result.push(arr[i]);
    }
  }
  return result;
}

/**
 * Generate URL-encoded query string from object (PHP's http_build_query() in JavaScript)
 * @param {Object} queryData - Data to convert to query string
 * @param {string|null} numericPrefix - Prefix for numeric keys
 * @param {string} argSeparator - Separator between arguments (default: '&')
 * @param {string|null} tempKey - Temporary key for nested objects
 * @returns {string} URL-encoded query string
 */
function httpBuildQuery(queryData, numericPrefix, argSeparator, tempKey) {
  numericPrefix = numericPrefix || null;
  argSeparator = argSeparator || "&";
  tempKey = tempKey || null;

  if (!queryData || typeof queryData !== "object") {
    return "";
  }

  var query = Object.keys(queryData).map(function (k) {
    var key = k;
    var value = queryData[k];

    if (tempKey) {
      key = tempKey + "[" + key + "]";
    }

    if (typeof value === "object" && value !== null) {
      return httpBuildQuery(value, null, argSeparator, key);
    }

    if (numericPrefix) {
      key = isNumeric(key) ? numericPrefix + Number(key) : key;
    }

    // Convert boolean and handle falsy values
    if (value === true) {
      value = "1";
    } else if (value === false) {
      value = "0";
    } else if (value === 0) {
      value = "0";
    } else {
      value = value || "";
    }

    return encodeParam(key) + "=" + encodeParam(value);
  });

  return cleanArray(query)
    .join(argSeparator)
    .replace(/[!'()*]/g, "");
}

module.exports = httpBuildQuery;
