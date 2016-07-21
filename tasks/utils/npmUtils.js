module.exports = function (gulp, $, config, args) {
  'use strict';

  var fs = require('fs-extra');
  var path = require('path');
  var glob = require('glob-all');
  var utils = require('./utils')();
  var clean = require('del');
  var request = require('sync-request');

  return {
    npmInstall: _install,
    checkNodeVersion: _checkNodeVersion,
    checkNPMVersion: _checkNPMVersion,
    isPackageInstalled: _isPackageInstalled
  };


  function _install(cwd, npm2) {
    var cwdRoot = cwd;
    console.log('Installing dependencies [' + cwd + '].....');
    utils.execSync('npm install', cwd);

    // If NPM version > 3.x.x, it's neccesary flatting dependencies (folder node_modules)
    if (npm2) {
      return _flatNodeModules(cwd);
    }

    function _flatNodeModules(cwd) {
      var nodeModules = glob.sync([cwd + '/node_modules/*/node_modules']);
      if (nodeModules && nodeModules.length > 0) {
        for (var i=0; i<nodeModules.length; i++) {
          //console.log('-> ' + nodeModules[i]);
          _flatNodeModules(path.dirname(nodeModules[i]));
        }
      }
      if (cwd !== cwdRoot) {
        //console.log('----> Copy ' + cwd + '/node_modules to ' + cwdRoot + '/node_modules');
        utils.copyDirectory(cwd + '/node_modules', cwdRoot + '/node_modules');
        clean.sync([cwd + '/node_modules'], {force: true});
      }
    }
  }

  /**
   * Check if a package is installed in local npm repository
   * @param npmComponentName
   * @param npmComponentVersion
   * @private
   */
  function _isPackageInstalled(npmComponentName, npmComponentVersion) {
    var url = 'http://localhost:4873/-/search/' + npmComponentName;
    var requestSync = request('GET', url);
    if (requestSync && requestSync.getBody()) {
      var body = JSON.parse(requestSync.getBody('utf8'));
      for (var i = 0; i < body.length; i++) {
        var resName = body[i].name;
        if (npmComponentName === resName) {
          var resVersion = body[i].version;
          var res = utils.compareVersions(npmComponentVersion, resVersion);
          if (res >= 0) {
            return true;
          }
        }
      }
    }
  }

  function _checkNodeVersion(target) {
    var version = process.versions.node;

    var minorVersion = version.split('.')[1];
    var majorVersion = version.split('.')[0];
    var minorVersionTarget = target.split('.')[1];
    var majorVersionTarget = target.split('.')[0];

    if (majorVersionTarget === majorVersion) {
      return minorVersionTarget <= minorVersion;
    }

    return majorVersionTarget <= majorVersion;
  }

  function _checkNPMVersion(target) {
    var version = process.versions.npm;

    var minorVersion = version.split('.')[1];
    var majorVersion = version.split('.')[0];
    var minorVersionTarget = target.split('.')[1];
    var majorVersionTarget = target.split('.')[0];

    if (majorVersionTarget === majorVersion) {
      return minorVersionTarget <= minorVersion;
    }

    return majorVersionTarget <= majorVersion;
  }

};
