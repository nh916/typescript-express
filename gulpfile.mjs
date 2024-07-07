import gulp from 'gulp';
import * as dartSass from 'sass';
import gulpSass from 'gulp-sass';
import cleanCSS from 'gulp-clean-css';
import autoprefixer from 'gulp-autoprefixer';
import sourcemaps from 'gulp-sourcemaps';
import gulpTypescript from 'gulp-typescript';
import uglify from 'gulp-uglify';

const paths = {
    styles: {
        src: 'src/public/stylesheets/**/*.scss',
        dest: 'src/public/stylesheets/'
    },
    scripts: {
        src: 'src/**/*.ts',
        dest: 'src/'
    }
};

/**
 * Convert Sass to CSS with sourcemaps, autoprefixer, and minification.
 * @returns {Stream} Gulp stream
 */
export function styles() {
    const sass = gulpSass(dartSass);

    return gulp.src(paths.styles.src)
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer({cascade: false}))
        .pipe(cleanCSS())
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(paths.styles.dest));
}

/**
 * Compile TypeScript to JavaScript, add sourcemaps, and minify.
 * @returns {Stream} Gulp stream
 */
export function scripts() {
    const tsProject = gulpTypescript.createProject('tsconfig.json');

    return tsProject.src()
        .pipe(sourcemaps.init())
        .pipe(tsProject())
        .pipe(uglify()) // Comment this line out when debugging
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(paths.scripts.dest));
}

/**
 * Watch for changes in files and run respective tasks.
 */
export function watch() {
    gulp.watch(paths.styles.src, styles);
    gulp.watch(paths.scripts.src, scripts);
}

const build = gulp.series(gulp.parallel(styles, scripts), watch);

gulp.task('default', build);

export default build;
