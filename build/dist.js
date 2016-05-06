/*eslint no-console: ["error", { allow: ["warn", "error", "log"] }] */

const { exec } = require('child_process');
const babel = require('babel-core');
const mkdirp = require('mkdirp');
const rimraf = require('rimraf');
const path = require('path');
const fs = require('fs');

const pkg = require('./utils/package');

const source = path.join('..', 'lib');
const relative = path.join('..', 'output', 'dist');
const root = path.join(__dirname, '..', 'output', 'dist');

const entry = path.join(__dirname, '..', 'fp-react.js');
const output = path.join(root, 'fp-react.js');

const name = 'fp-react';
const keywords = [];

makePackage();

function makePackage () {
  clear(function () {
    mkdir(function () {
      bundle(function () {
        makeEntry(function () {
          pkg(name, keywords, root, function (err) {
            if (err) return console.error(err);
            console.log('Dist files built');
          });
        });
      });
    });
  });
}

const opts = { cwd: __dirname };

function makeEntry (cb) {
  babel.transformFile(entry, function (err, { code }) {
    if (err) return console.error(err);
    code = code.replace(/.\/lib\//g, './');

    fs.writeFile(output, code, function (err) {
      if (err) {
        return console.error(err);
      }
      cb();
    });
  });
}

function bundle (cb) {
  exec(`babel ${source} --out-dir ${relative}`, opts, function (err) {
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
