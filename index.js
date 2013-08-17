// Copyright 2013 Timothy J Fontaine <tjfontaine@gmail.com>
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
// THE SOFTWARE

var m = require('module');

var setflags = require('bindings')('setflags');

exports.flags = {};

function parseArg(arg) {
  var a = arg.split('=');
  var key = a[0].toLowerCase().replace('_', '-');
  exports.flags[key] = a[1];
}

process.execArgv.forEach(parseArg);

exports.setFlags = function(args) {
  if (!args)
    return;

  if (!Array.isArray(args))
    args = [args];

  args.forEach(function(arg) {
    if (!arg) return;
    arg = ''+arg;
    parseArg(arg);
    setflags.setFlags(arg);
  });
};

exports.harmonyRequire = function(module, args) {
  if (!args) {
    args = [
      '--harmony_collections',
      '--harmony_modules',
      '--harmony_proxies',
      '--harmony_scoping',
      '--harmony_typeof',
    ];
  }

  return exports.require(module, args);
};

exports.require = function(module, args) {
  if (!args) return;

  if (!Array.isArray(args)) {
    args = [args];
  }

  exports.setFlags(args);

  m._contextLoad = true;

  var ret = require(module);

  m._contextLoad = false;

  return ret;
};
