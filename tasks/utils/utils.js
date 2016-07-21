module.exports = function () {
  'use strict';

  var fs = require('fs-extra');

  return {
    createDirectory : _createDirectory,
    writeFileSync : _writeFileSync,
    execSync : _execSync,
    compareVersions : _compareVersions,
    copyDirectory: _copyDirectory
  };

  function _copyDirectory(src, dest) {
    fs.copySync(src, dest);
  }

  function _createDirectory(directory) {
    try {
      fs.statSync(directory);
    } catch(e) {
      fs.mkdirSync(directory);
    }
  }

  function _writeFileSync(file, content) {
    fs.writeFileSync(file, content, 'utf-8');
  }

  function _execSync(cmd, cwd) {
    var node012 = _isNodeVersionGreaterOrEqual('0.12');
    var exec = null;
    if (node012) {
      exec = require('child_process').execSync;
      exec(cmd, {cwd: cwd, stdio: [0, 1, 2]});
    } else {
      exec = require('sync-exec');
      var res = exec(cmd, {cwd: cwd});
      if (res) {
        console.log(res.stdout);

        if (res.stderr) {
          console.log(res.stderr);
        }

      }

    }
  }

  function _isNodeVersionGreaterOrEqual(target) {
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

  /**
   * Compare two versions in format x.y.z
   * @param v1
   * @param v2
   * @returns {*}
   * @private
   */
  function _compareVersions(v1, v2) {
    var v1Parts = v1.split('.');
    var v2Parts = v2.split('.');
    var v1Major = v1Parts[0];
    var v2Major = v2Parts[0];
    var v1Minor = v1Parts[1];
    var v2Minor = v2Parts[1];
    var v1Fix = v1Parts[2];
    var v2Fix = v2Parts[2];

    if (v1Major === v2Major) {
      if (v1Minor === v2Minor) {
        return _compareNumbers(v1Fix, v2Fix);
      }
      return _compareNumbers(v1Minor, v2Fv2Minorix);
    }
    return _compareNumbers(v1Major, v2Major);

    function _compareNumbers(n1, n2) {
      var res = 0;
      if (n1 !== n2) {
        res = (n1 > n2) ? -1 : 1;
      }
      return res;
    }
  }

};
