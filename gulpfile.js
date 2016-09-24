var gulp = require('gulp');
var uglify = require('gulp-uglify');
var livereload = require('gulp-livereload');
var concat = require('gulp-concat');
var minifyCss = require('gulp-minify-css');
var autoprefixer = require('gulp-autoprefixer');
var plumber = require('gulp-plumber');
var sourcemaps = require('gulp-sourcemaps');
var sass = require('gulp-sass');


//Handlebars plugins
var handlebars = require('gulp-handlebars');
var handlebarsLib = require('handlebars');
var declare = require('gulp-declare');
var wrap = require('gulp-wrap');


//File Paths
var DIST_PATH = 'public/dist';
var SCRIPTS_PATH = 'public/scripts/**/*.js';
var CSS_PATH = 'public/css/**/*.css';
var TEMPLATE_PATH = 'templates/**/*.hbs';

gulp.task('templates',function(){
      return gulp.src(TEMPLATE_PATH)
      .pipe(handlebars({
          handlebars:handlebarsLib
        }))
      .pipe(wrap('Handlebars.template(<%= contents %>)'))
      .pipe(declare({
        namespace:'templates',
        noRedeclare:true
      }))
      .pipe(concat('template.js'))
      .pipe(gulp.dest(DIST_PATH))
      .pipe(livereload());


});

// // -----------styles task-----------------//
//   gulp.task('styles',function(){
//     console.log('starting styles task');
//     return gulp.src(['public/css/reset.css',CSS_PATH])
//         .pipe(plumber(function(err){
//           console.log('styles task errors');
//           console.log(err);
//           this.emit('end');
//         }))
//         .pipe(sourcemaps.init())
//         .pipe(concat('styles.css'))
//         .pipe(autoprefixer({
//           browsers:['last 2 versions'],
//         }))
//         .pipe(minifyCss())
//         .pipe(sourcemaps.write())
//         .pipe(gulp.dest(DIST_PATH))
//         .pipe(livereload());
// });



// -----------styles task for sass-----------------//
  gulp.task('styles',function(){
    console.log('starting styles task');
    return gulp.src('public/sass/style.scss')
        .pipe(plumber(function(err){
          console.log('styles task errors');
          console.log(err);
          this.emit('end');
        }))
        .pipe(autoprefixer({
          browsers:['last 2 versions'],
        }))
        .pipe(sass({
          outputStyle: 'compressed'
        }))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(DIST_PATH))
        .pipe(livereload());
});




//------------scripts task---------------//
gulp.task('scripts',function(){
    console.log('started scripts task');
    return gulp.src(SCRIPTS_PATH)
       .pipe(sourcemaps.init())
       .pipe(uglify())
       .pipe(concat('scripts.js'))
       .pipe(sourcemaps.write())
       .pipe(gulp.dest(DIST_PATH))
       .pipe(livereload());
});



//------------images task---------------//
gulp.task('images',function(){
console.log('images task started');
});



//------------gulp watch task-----------//
gulp.task('watch',function(){
  console.log('watch task started');
  require('./server.js');
   livereload.listen();
  gulp.watch(SCRIPTS_PATH,['scripts']);
  // gulp.watch('CSS_PATH',['styles']);
  gulp.watch('public/sass/**/*.scss',['styles']);
  gulp.watch(TEMPLATE_PATH,['templates']);
});
