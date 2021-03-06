const { series, parallel, src, dest, watch } = require('gulp'),
  angularTemplatecache = require('gulp-angular-templatecache'),
  cleanCss = require('gulp-clean-css'),
  concat = require('gulp-concat'),
  connect = require('gulp-connect'),
  del = require('del'),
  ngAnnotate = require('gulp-ng-annotate'),
  rev = require('gulp-rev'),
  revRewrite = require('gulp-rev-rewrite'),
  sass = require('gulp-sass'),
  shell = require('gulp-shell'),
  uglify  = require('gulp-uglify');


const scripts = [
  'app/logic/minesweeperFiledState/minesweeperFiledState.js',
  'app/logic/minesweeperField/*.js',
  'app/logic/minesweeperGame/*.js',
  'node_modules/angular/angular.js',
  'node_modules/angular-*/*.js',
  '!node_modules/angular*/*.min.js',
  '!node_modules/angular*/*.test.js',
  '!node_modules/angular*/*-mocks.js',
  '!node_modules/angular*/index.js',
  'app/index.js',
  'app/services/**/*.js',
  'app/components/**/*.js',
  'app/directives/**/*.js',
  'app/views/**/*.js',
  '!app/**/*.test.js',
  '!app/app.min.js'
];

const styles = [
  'app/index.scss',
  'app/directives/**/*.scss',
  'app/views/**/*.scss',
  'app/components/minesweeper-field/minesweeper-field.scss',
], styleIncludes = [
  'node_modules/angular-material'
];


/* Development *///////////////////////////////////////////

function js() {
  return src(scripts, { sourcemaps: true })
    .pipe(concat('app.min.js'))
    .pipe(ngAnnotate({add: true}))
    .pipe(dest('app', { sourcemaps: '.' }))
}

function css() {
  return src(styles, { sourcemaps: true })
    .pipe(concat('app.min.scss'))
    .pipe(sass({ includePaths: styleIncludes }).on('error', sass.logError))
    .pipe(dest('app', { sourcemaps: '.' }))
}

function serve(done) {
  connect.server({
    root: 'app/',
    port: 8888,
    fallback: 'app/index.html',
    livereload: true
  }, done);
}

function reload(path) {
  return src(path)
    .pipe(connect.reload());
}

function reload_js() {
  return reload('app/app.min.js');
}

function reload_css() {
  return reload('app/app.min.css');
}

function watch_src(done) {
  watch(['app/**/*.html'])
    .on('all', (event, path) => reload(path)
  );
  watch(scripts, series(js, reload_js));
  watch(styles, series(css, reload_css));
  done();
}

exports.default = series(
  parallel(js, css),
  parallel(serve, watch_src)
);


/* Distribution *//////////////////////////////////////////

function dist_clean() {
  return del(['dist/**/*']);
}

const templates = [
  'app/**/*.html',
  '!app/index.html'
];

function partials() {
  return src(templates)
    .pipe(angularTemplatecache('templates.js', {
      moduleSystem: 'IIFE',
      transformUrl: function(url) {
        // Remove leading slash which occurs in gulp 4
        return url.replace(/^\/+/g, '');
      }
    }))
    .pipe(dest('dist'));
}

function dist_js_build() {
  return src(scripts.concat(['dist/templates.js']), { sourcemaps: true })
    .pipe(concat('app.min.js'))
    .pipe(ngAnnotate({add: true}))
    .pipe(uglify())
    .pipe(dest('dist', { sourcemaps: '.' }));
}

function dist_js() {
  return del(['dist/templates.js']);
}

function dist_css() {
  return src(styles, { sourcemaps: true })
    .pipe(concat('app.min.scss'))
    .pipe(sass({ includePaths: styleIncludes }).on('error', sass.logError))
    .pipe(cleanCss())
    .pipe(dest('dist', { sourcemaps: '.' }));
}

function revision() {
  return src(['dist/app.min.css', 'dist/app.min.js'])
    .pipe(rev())
    .pipe(dest('dist'))
    .pipe(rev.manifest())
    .pipe(dest('dist'))
}

function dist_index() {
  const manifest = src('dist/rev-manifest.json');
  return src('app/index.html')
    .pipe(revRewrite({manifest: manifest}))
    .pipe(dest('dist'));
}

function dist_app() {
  return del(['dist/app.min.css', 'dist/app.min.js']);
}

function dist_favicon() {
  return src('app/favicon.png')
    .pipe(dest('dist'));
}

function dist_images() {
  return src('app/images/**/*.*')
    .pipe(dest('dist/images'));
}

exports.build = series(
  dist_clean,
  parallel(
    series(
      parallel(
        series(partials, dist_js_build, dist_js),
        dist_css
      ),
      revision,
      dist_index,
      dist_app
    ),
    dist_favicon,
    dist_images
  )
);

function dist_serve(done) {
  connect.server({
    root: 'dist/',
    port: 8888,
    fallback: 'dist/index.html'
  });
  done();
}
exports.dist_serve = dist_serve;

function deploy_staging() {
  return shell.task([
  "rsync -azvP dist/ root@203.0.113.255:/var/www/html --exclude=\".git/\" --delete",
  ]);
}