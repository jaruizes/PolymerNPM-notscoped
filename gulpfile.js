(function () {
  'use strict';

  var gulp = require('gulp');
  var $ = require('gulp-load-plugins')();
  var args = require('yargs').argv;
  var config = require('./tasks/config/config')();

  function getTask(task) {
    return require('./tasks/' + task)(gulp, $, args, config);
  }

  gulp
    .task('publish-polymer-libs', getTask('publish-polymer-libs'))
    .task('transform-polymer-libs', getTask('transform-polymer-libs'))
})();
