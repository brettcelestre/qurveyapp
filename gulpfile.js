var gulp = require('gulp'),
    nodemon = require('gulp-nodemon'),
    exec = require('child_process').exec,
    gulpProtractorAngular = require('gulp-angular-protractor');

gulp.task('server', ['mocha'], function () {
  nodemon({ 
      script: 'server/server.js',
      ext: 'html js',
      ignore: ['.gitignore.js']})
    .on('restart', function () {
      console.log('restarted!');
    });
});

gulp.task('protractor', ['server'], function(callback) {
  gulp
    .src(['server/test/e2e/e2eSpec.js'])
    .pipe(gulpProtractorAngular({
      'configFile': 'server/test/e2e/conf.js',
      'debug': false,
      'autoStartStopServer': true
    }))
    .on('error', function(err) {
      console.log(err);
    })
    .on('end', callback);
});

gulp.task('mocha', function(cb) {
  exec('node_modules/mocha/bin/mocha server/test/test.js', function (err, stdout, stderr) {
    console.log(stdout);
    console.log(stderr);
    cb(err);
  });
});

gulp.task('default', ['mocha', 'server', 'protractor']);
