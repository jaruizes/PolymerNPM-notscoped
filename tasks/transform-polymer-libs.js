/**
 * Copies polymer libs for demo components to demolibs ir order to get
 * a flat folder lib
 */
module.exports = function (gulp, $, args, config) {
  'use strict';

  var rename = require('gulp-rename');
  var replace = require('gulp-replace');
  var glob = require('glob-all');
  var fs = require('fs');
  var path = require('path');
  var utils = require('./utils/utils')();

  return function () {
    console.log('Installing node packages...');
    utils.execSync('npm install', config.polymerNPM);
    return _createNewPackages();

    function _createNewPackages() {
      console.log('Creating ' + config.newModules + ' from ' + config.nodeModules + '/ ' + config.polymerScopePackage + ' .....');
      return gulp.src([config.nodeModules + '/' + config.polymerScopePackage + '/**/*'])
          .pipe(rename(function (path) {
            path.dirname = 'ing.polymer.' + path.dirname;
          }))
          .pipe(gulp.dest(config.newModules))
          .on('end', _modifyPackages);

      function _modifyPackages() {
        var libs = glob.sync([config.newModules + '/*/package.json']);
        for (var i=0; i<libs.length; i++) {
          var newPackageFile = {};
          var packageFile = libs[i];
          var packageContent = require(packageFile);
          var newName = '';
          var oldName = packageContent.name;

          for (var prop in packageContent) {
            if (prop.indexOf('_') !== 0) {
              var value = packageContent[prop];
              if (prop === 'name') {
                newName = value.replace('@', 'ing.').replace('/','.');
                console.log('[' + oldName + '] Modifying package file to ' + newName);
                value = newName;
              }
              if ((prop === 'devDependencies' || prop === 'dependencies') && value) {
                console.log('[' + oldName + '] Modifying ' + prop);
                value = modifyDependency(value);
              }

              newPackageFile[prop] = value;
            }
          }

          utils.writeFileSync(packageFile, JSON.stringify(newPackageFile));
        }

        function modifyDependency(dependencies) {
          var newDependencies = {};
          for (var dependency in dependencies) {
            var value = dependencies[dependency];
            var name = dependency.replace('@', 'ing.').replace('/','.');
            newDependencies[name] = value;
          }

          return newDependencies;
        }
      }
    }
  };
};
