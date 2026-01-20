"use strict";

var httpBuildQuery = require("../index");
var assert = require("chai").assert;
var expect = require("chai").expect;

describe("http-build-query", function () {
  it("should return an empty string for empty input", function () {
    var inputNull = null;
    var inputUndefined = {}.nothing;
    var inputEmpty = {};
    var expectedResult = "";

    assert.strictEqual(
      httpBuildQuery(inputNull),
      expectedResult,
      "null yields empty string",
    );
    assert.strictEqual(
      httpBuildQuery(inputUndefined),
      expectedResult,
      "undefined yields empty string",
    );
    assert.strictEqual(
      httpBuildQuery(inputEmpty),
      expectedResult,
      "empty objects yield empty string",
    );
  });

  it("should handle basic types correctly", function () {
    var params = {
      string: "test",
      null: null,
      empty: "",
      number: 196645,
      zero: 0,
      params: {
        string: "test",
        null: null,
        empty: "",
        number: 196645,
        zero: 0,
      },
    };

    var result = httpBuildQuery(params);

    expect(result).to.include("empty=");
    expect(result).to.include("null=");
    expect(result).to.include("number=196645");
    expect(result).to.include("zero=0");
    expect(result).to.include("string=test");
  });

  it("should match PHP http_build_query() example #3", function () {
    var expectedResult =
      "user%5Bname%5D=Bob+Smith&user%5Bage%5D=47&user%5Bsex%5D=M&user%5Bdob%5D=5%2F12%2F1956&pastimes%5B0%5D=golf&pastimes%5B1%5D=opera&pastimes%5B2%5D=poker&pastimes%5B3%5D=rap&children%5Bbobby%5D%5Bage%5D=12&children%5Bbobby%5D%5Bsex%5D=M&children%5Bsally%5D%5Bage%5D=8&children%5Bsally%5D%5Bsex%5D=F&flags_0=CEO";

    var data = {
      user: {
        name: "Bob Smith",
        age: 47,
        sex: "M",
        dob: "5/12/1956",
      },
      pastimes: ["golf", "opera", "poker", "rap"],
      children: {
        bobby: {
          age: 12,
          sex: "M",
        },
        sally: {
          age: 8,
          sex: "F",
        },
      },
      "+0": "CEO",
    };

    var result = httpBuildQuery(data, "flags_");
    assert.strictEqual(result, expectedResult);
  });

  it("should serialize arrays of objects correctly", function () {
    var input = {
      children: [
        {
          name: "bobby",
          age: 12,
          sex: "M",
        },
        {
          name: "sally",
          age: 8,
          sex: "F",
        },
      ],
    };

    var result = httpBuildQuery(input);
    var expectedResult = encodeURI(
      "children[0][name]=bobby&children[0][age]=12&children[0][sex]=M&children[1][name]=sally&children[1][age]=8&children[1][sex]=F",
    );

    assert.strictEqual(result, expectedResult);
  });

  it("should handle boolean values correctly", function () {
    var input = {
      trueVal: true,
      falseVal: false,
      nested: {
        trueVal: true,
        falseVal: false,
      },
    };

    var result = httpBuildQuery(input);
    expect(result).to.include("trueVal=1");
    expect(result).to.include("falseVal=0");
    expect(result).to.include("nested%5BtrueVal%5D=1");
    expect(result).to.include("nested%5BfalseVal%5D=0");
  });

  it("should respect custom argument separator", function () {
    var input = { a: 1, b: 2 };
    var result = httpBuildQuery(input, null, ";");
    assert.strictEqual(result, "a=1;b=2");
  });
});
