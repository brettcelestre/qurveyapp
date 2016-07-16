var gulp = require('gulp'),
    nodemon = require('gulp-nodemon'),
    exec = require('child_process').exec,
    gulpProtractorAngular = require('gulp-angular-protractor');
    // mongoData = require('gulp-mongodb-data');
//     bs = require('browser-sync');
    
// var paths = {
//   // all our client app js files, not including 3rd party js files
//   scripts: ['client/**/*.js'],
//   html: ['client/views/*.html', 'client/index.html'],
//   styles: ['client/assets/style.css']
//   // test: ['specs/**/*.js']
// };
// gulp.task('start', ['serve'],function () {
//   bs({
//     notify: true,
//     // address for server,
//     injectChanges: true,
//     files: paths.scripts.concat(paths.html, paths.styles),
//     proxy: 'localhost:5000'
//   });
// });
// gulp.task('mongo', function(){
//   gulp.src('./')
// })
// Starts server
// gulp.task('default', function(){
//   nodemon({
//     script: 'server/server.js',
//     ignore: 'node_modules/**/*.js'
//   })
// });
// gulp.task('server', function (cb) {
//   // Starts server
//   exec('node server/server.js', function (err, stdout, stderr) {
//     console.log(stdout);
//     console.log(stderr);
//     cb(err);
//   });
  // Starts mongodb ( local )
  // exec('mongod', function (err, stdout, stderr) {
  //   console.log(stdout);
  //   console.log(stderr);
  //   cb(err);
  // });
// });
gulp.task('server', function () {
  nodemon({ script: 'server/server.js',
    ext: 'html js',
    ignore: ['.gitignore.js']})
    .on('restart', function () {
      console.log('restarted!');
    });
});

gulp.task('protractor', function(callback) {
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
// gulp.task('default', ['serve']);