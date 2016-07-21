'use strict';
module.exports = function () {

  var fs = require('fs');
  var path = require('path');

  // Set the root directory
  var root = __dirname + '/../../';
  console.log('Config: Using ' + root + ' as root directory');

  var config = {
    root: root,
    polymerNPM: root + 'polymerNPM',
    newModules: root + 'polymerNPM/new_packages',
    nodeModules: root + 'polymerNPM/node_modules',
    polymerScopePackage: '@polymer'
  };

  return config;
};
