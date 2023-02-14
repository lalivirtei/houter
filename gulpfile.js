const {src, dest, watch, parallel, series} = require('gulp');
const pug = require('gulp-pug');
const sass = require('gulp-sass')(require('sass'));
const postCSS = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const bs = require('browser-sync').create();
const webpack = require('webpack');
const webpackStream = require('webpack-stream');
const concat = require('gulp-concat');
const TerserPlugin = require('terser-webpack-plugin');
const imagemin = require('gulp-imagemin');
const changed = require('gulp-changed');
const sourcemaps = require('gulp-sourcemaps');
const flatten = require('gulp-flatten');
const data = require('gulp-data');
const content = require('./src/content.json');

function browserSync() {
    bs.init({
        server: {
            baseDir: 'build',
        },
        notify: false
    });
}

function layout() {
    return src(['src/index.pug', 'src/placeholder.pug'])
        .pipe(data(() => content))
        .pipe(pug())
        .pipe(dest('build'))
        .pipe(bs.stream())
}

function styles() {
    // noinspection JSCheckFunctionSignatures
    return src('src/main.scss')
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(postCSS([
            autoprefixer({grid: 'autoplace'}),
            cssnano({
                preset: [
                    'default',
                    {
                        discardComments: {removeAll: true}
                    }
                ]
            })
        ]))
        .pipe(sourcemaps.write())
        .pipe(dest('build'))
        .pipe(bs.stream())
}

function scripts() {
    return src(['node_modules/select2/dist/js/select2.min.js',
        'src/blocks/**/*.js'])
        .pipe(sourcemaps.init())
        .pipe(webpackStream({
            mode: 'production',
            performance: {hints: false},
            module: {
                rules: [
                    {
                        test: /\.m?js$/,
                        exclude: /('node_modules')/,
                        use: {
                            loader: 'babel-loader',
                            options: {
                                presets: ['@babel/preset-env'],
                                plugins: ['babel-plugin-root-import']
                            }
                        }
                    }
                ]
            },
            optimization: {
                minimize: true,
                minimizer: [
                    new TerserPlugin({
                        terserOptions: {
                            format: {
                                comments: false
                            }
                        },
                        extractComments: false
                    })
                ]
            }

        }, webpack).on('error', () => this.emit('end')))
        .pipe(concat('scripts.min.js'))
        .pipe(sourcemaps.write())
        .pipe(dest('build'))
        .pipe(bs.stream())
}

function images() {
    return src('src/**/img/*')
        .pipe(changed('build/img'))
        .pipe(imagemin([
            imagemin.svgo({
                // plugins disabled to prevent svgo from empty svg sprite
                plugins: [
                    {
                        cleanupIDs: false,
                        removeUselessDefs: false
                    }
                ]
            })
        ]))
        .pipe(flatten({subPath: [1, 0]}))
        .pipe(dest('build/img'))
        .pipe(bs.stream());
}

function assets() {
    return src('src/favicon/*')
        .pipe(dest('build'));
}

function watcher() {
    watch("src/**/*.scss", {usePolling: true}, styles);
    watch("src/**/*.js", {usePolling: true}, scripts);
    watch("src/img/*", {usePolling: true}, images);
    watch("src/**/*.pug", {usePolling: true}, layout).on('change', bs.reload);
}

exports.layout = layout;
exports.styles = styles;
exports.scripts = scripts;
exports.images = images;
exports.build = parallel(layout, styles, scripts, images, assets);

exports.browserSync = browserSync;
exports.watcher = watcher;
exports.default = series(parallel(layout, styles, scripts, images, assets), parallel(browserSync, watcher));