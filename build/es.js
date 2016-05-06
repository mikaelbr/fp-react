/*eslint no-console: ["error", { allow: ["warn", "error", "log"] }] */

const mkdirp = require('mkdirp');
const rimraf = require('rimraf');
const path = require('path');
const fs = require('fs');
const { ncp } = require('ncp');

const pkg = require('./utils/package');

const source = path.join(__dirname, '..', 'lib');
const root = path.join(__dirname, '..', 'output', 'es');

const entry = path.join(__dirname, '..', 'fp-react.js');
const output = path.join(root, 'fp-react.js');

const name = 'fp-react-es';
const keywords = ['ES6', 'modules'];

makePackage();

function makePackage () {
  clear(function () {
    mkdir(function () {
      bundle(function () {
        makeEntry(function () {
          pkg(name, keywords, root, function (err) {
            if (err) return console.error(err);
            console.log('ES Modules built');
          });
        });
      });
    });
  });
}

function makeEntry (cb) {
  fs.readFile(entry, function (err, code) {
    if (err) return console.error(err);
    code = code.toString('utf-8').replace(/.\/lib\//g, './');

    fs.writeFile(output, code, function (err) {
      if (err) {
        return console.error(err);
      }
      cb();
    });
  });
}

function bundle (cb) {
  ncp(source, root, function (err) {
    if (err) {
      return console.error(err);
    }
    cb();
  });
}

function mkdir (cb) {
  mkdirp(root, function (err) {
    if (err) {
      return console.error(err);
    }
    cb();
  });
}

function clear (cb) {
  return rimraf(root, function (err) {
    if (err) {
      return console.error(err);
    }
    cb();
  });
}
