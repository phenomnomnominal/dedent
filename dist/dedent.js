"use strict";

function dedent(strings) {
  for (var _len = arguments.length, values = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    values[_key - 1] = arguments[_key];
  }

  var raw = undefined;
  if (typeof strings === "string") {
    // dedent can be used as a plain function
    raw = [strings];
  } else {
    raw = strings.raw;
  }

  // first, perform interpolation
  var result = "";
  for (var i = 0; i < raw.length; i++) {
    // join lines when there is a suppressed newline
    result += raw[i].replace(/\\\n[ \t]*/g, "");
    if (i < values.length) {
      result += values[i];
    }
  }

  // dedent eats leading and trailing whitespace too
  result = result.trim();

  // now strip indentation
  var lines = result.split("\n");
  var mindent = null;
  lines.forEach(function (l) {
    var m = l.match(/^ +/);
    if (m) {
      var indent = m[0].length;
      if (!mindent) {
        // this is the first indented line
        mindent = indent;
      } else {
        mindent = Math.min(mindent, indent);
      }
    }
  });
  if (mindent === null) {
    return result;
  }return lines.map(function (l) {
    return l[0] === " " ? l.slice(mindent) : l;
  }).join("\n");
}

if ('undefined' !== typeof module) {
  module.exports = dedent;
}
