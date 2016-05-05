
const path = require('path');
const fs = require('fs');
const pkg = require(path.join(__dirname, '..', '..', 'package.json'));

delete pkg.devDependencies;
delete pkg.ava;

pkg.scripts = {
  'test': 'echo "See https://travis-ci.org/mikaelbr/fp-react for running tests"'
};

module.exports = function (name, keywords, dest, cb) {
  pkg.name = name;
  pkg.keywords = (pkg.keywords || []).concat(keywords);
  fs.writeFile(path.join(dest, 'package.json'), JSON.stringify(pkg, null, 2), cb);
};
