/**
 * Copy polymer libs for demo components to demolibs ir order to get
 * a flat folder lib
 */
module.exports = function (gulp, $, args, config) {
  'use strict';

  var glob = require('glob-all');
  var path = require('path');
  var utils = require('./utils/utils')();

  return function () {
    publishPackages();
  };

  function publishPackages() {
    var libs = glob.sync([config.ingModules + '/*/package.json']);
    console.log(config.ingModules + '/*/package.json');
    console.log(libs);

    if (!libs || libs.length === 0) {
      console.log('No se han encontrado candidatos');
    }
    for (var i=0; i<libs.length; i++) {
      var packageFile = libs[i];
      unpublish(packageFile);
      publish(packageFile);
    }

    function publish(packageFile) {
      utils.execSync('npm publish', path.dirname(packageFile));
    }

    function unpublish(packageFile) {
      utils.execSync('npm unpublish --force', path.dirname(packageFile));
    }
  }

};
