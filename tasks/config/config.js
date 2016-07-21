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
    ingModules: root + '/polymerNPM/ing_modules',
    nodeModules: root + '/polymerNPM/node_modules'
  };

  return config;
};
