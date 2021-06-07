// uncomment TweenMax && jQuery in scriptsArray



let gulp = require('gulp'),
    sass = require('gulp-ruby-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    cssnano = require('gulp-cssnano'),
    uglify = require('gulp-uglify'),
    imagemin = require('gulp-imagemin'),
    htmlmin = require('gulp-htmlmin'),
    rename = require('gulp-rename'),
    concat = require('gulp-concat'),
    runSequence = require('run-sequence'),
    del = require('del'),
    babel = require('gulp-babel');

require('events').EventEmitter.prototype._maxListeners = 100;

gulp.task('documents', function() {
    gulp.src(['src/docs/**/*.html'])
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest('dist/docs'));

    gulp.src(['src/docs/display.html'])
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest(''));

    gulp.src(['src/docs/expand_desktop.html'])
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(rename({ basename: 'expand' }))
    .pipe(gulp.dest(''));

    return gulp.src(['src/docs/expand_mobile.html'])
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(rename({ basename: 'expand' }))
    .pipe(gulp.dest('mobile'));
});

gulp.task('styles-concat', function() {
  gulp.src([
      'src/styles/mixins.scss',
      'src/styles/variables.scss',
      'src/styles/globals.scss',
      'src/styles/player.scss',
      'src/styles/display.scss'
    ])
    .pipe(concat('display.scss'))
    .pipe(gulp.dest('dist/styles'));

  gulp.src([
      'src/styles/mixins.scss',
      'src/styles/variables.scss',
      'src/styles/globals.scss',
      'src/styles/player.scss',
      'src/styles/expand_desktop.scss'
    ])
    .pipe(concat('expand_desktop.scss'))
    .pipe(gulp.dest('dist/styles'));

  return gulp.src([
      'src/styles/mixins.scss',
      'src/styles/variables.scss',
      'src/styles/globals.scss',
      'src/styles/player.scss',
      'src/styles/expand_mobile.scss'
    ])
    .pipe(concat('expand_mobile.scss'))
    .pipe(gulp.dest('dist/styles'));

});

gulp.task('styles', function() {
  return sass('dist/styles/*.scss', { style: 'expanded' })
    .pipe(autoprefixer('last 6 version'))
    .pipe(gulp.dest('dist/styles'))
    .pipe(rename({suffix: '.min'}))
    .pipe(cssnano({zindex:false}))
    .pipe(gulp.dest('dist/styles'));
});


let scriptsArray = [
  'node_modules/screenfull/dist/screenfull.js',
  'node_modules/iphone-inline-video/dist/iphone-inline-video.min.js',
  //'node_modules/gsap/src/minified/TweenMax.min.js',
  //'node_modules/jquery/dist/jquery.min.js',
  'src/scripts/core/essentials.js',
  'src/scripts/pixels.js',
  'src/scripts/setup.js',
  'src/scripts/core/logger.js',
  'src/scripts/core/ticker.js',
  'src/scripts/core/tracking.js',
  'src/scripts/core/dwell.js',
  'src/scripts/core/messenger.js',
  'src/scripts/core/supervisor.js',
  'src/scripts/core/manager.js',
  'src/scripts/core/pixelHelper.js',
  'src/scripts/mobile/gestures.js',
  'src/scripts/mobile/sensors.js',
  'src/scripts/counter.js',
  'src/scripts/player.js',
  'src/scripts/iframe-builder.js',
  'src/scripts/config.js',
  'src/scripts/expand.js',
  'src/scripts/display.js'
  ];

let scriptsExceptArray = [ // all scripts except
    ['expand'], // display
    ['display','iphone-inline-video','gestures','sensors'], // expand_desktop
    ['display'], // expand_mobile
];

let scriptsUglifiedArray = []; // store dest/scripts/uglified/ + fileName + '.js' of scriptsArray
let scriptsRawArray = []; // raw files names of scriptsArray

let scriptFilter = (array,index) =>{
    return array.filter((e,i,a)=>{
        let hold = scriptsExceptArray[index].filter((ee,ii,aa)=>{

            return e.indexOf(ee) !== -1;
        });
        return hold[0] === undefined;
    });
};


gulp.task('scriptsUglyTask', () =>{
    scriptsArray.forEach((e,i,a)=>{
        let hold = e.split('.')[0].split('/').reverse()[0]; // raw file name
        scriptsUglifiedArray.push('dist/scripts/uglified/' + hold + '.js');
        scriptsRawArray.push(hold);

        gulp.task(hold,()=>{
            return gulp.src(e)
                       .pipe(babel({presets: ['env']}))
                       .pipe(uglify())
                       .pipe(rename({basename: hold, suffix: ''}))
                       .pipe(gulp.dest('dist/scripts/uglified'));
        });
    });
});


gulp.task('scriptsDocumentation',()=>{
    return gulp.src(scriptsArray)
               .pipe(concat('doc.js'))
               .pipe(gulp.dest('dist/scripts'));
});


[['scriptsDisplay','display'],['scriptsExpandDesktop','expand_desktop'],['scriptsExpandMobile','expand_mobile']].forEach((e,i)=>{
    gulp.task(e[0],()=>{
        gulp.src(scriptFilter(scriptsArray,i))
            .pipe(concat(e[1] + '.js'))
            .pipe(gulp.dest('dist/scripts'));
        return gulp.src(scriptFilter(scriptsUglifiedArray,i))
                   .pipe(concat(e[1] + '.min.js'))
                   .pipe(gulp.dest('./dist/scripts'));
    });
});

let scriptsTaskNames = ['scriptsDocumentation', 'scriptsDisplay', 'scriptsExpandDesktop', 'scriptsExpandMobile'];

gulp.task('media', function() {
  return gulp.src('resources/media/**/*')
    .pipe(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true }))
    .pipe(gulp.dest('resources/media'));
});

gulp.task('copy-assets', function() { return gulp.src(['src/assets/**/*']).pipe(gulp.dest('dist/assets')); });
gulp.task('clean', function() { return del(['dist/styles', 'dist/scripts']); });
gulp.task('remove', function() { return del(['dist/styles/style.scss']); });
gulp.task('watch', function() {
  gulp.watch('src/styles/**/*.scss', function() { runSequence('styles-concat', ['styles']); });

    scriptsArray.forEach(function(elem,i,arr){
        gulp.watch(  elem,function(){    runSequence(scriptsRawArray[i],scriptsTaskNames )    }  );
    });

  gulp.watch('src/**/*.php', ['documents', 'copy-assets']);
  gulp.watch('src/docs/**/*.html', ['documents']);
});
gulp.task('compress-media', [], function() { runSequence('media'); });

gulp.task('default', ['clean','scriptsUglyTask'], function() {
    runSequence('styles-concat',scriptsRawArray,scriptsTaskNames, ['documents', 'styles', 'copy-assets'], ['remove', 'watch']); });

gulp.task('compile', ['clean','scriptsUglyTask'], function() {
    runSequence('styles-concat',scriptsRawArray, ['documents', 'styles', 'copy-assets'],scriptsTaskNames, 'remove'); });
