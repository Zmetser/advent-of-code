// Generated by BUCKLESCRIPT VERSION 4.0.7, PLEASE EDIT WITH CARE
'use strict';

var Fs = require("fs");

function linesFromFile(filename) {
  return Fs.readFileSync(filename, "utf8").split("\n");
}

exports.linesFromFile = linesFromFile;
/* fs Not a pure module */