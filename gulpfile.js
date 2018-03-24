var gulp = require('gulp'),
	less = require('gulp-less'),
	imagemin = require('gulp-imagemin'),
	cssmin = require('gulp-cssmin'),
	autoprefixer = require('gulp-autoprefixer'),
	rev = require('gulp-rev'),//添加hash版本号 md5加密 只要已修改就会变化
	useref = require('gulp-useref'),//合并修改html的路径 不压缩
	uglify = require('gulp-uglify'),
	rename = require('gulp-rename'),
	revCollector = require('gulp-rev-collector'),//实现内部的替换
	htmlmin = require('gulp-htmlmin'),
	gulpif = require('gulp-if');

gulp.task('css',function () {
	//编译 添加私有化前缀 css压缩
	return gulp.src('./src/css/*.less')
		.pipe(less())
		.pipe(autoprefixer())
		.pipe(cssmin())
		.pipe(rev())
		.pipe(gulp.dest('./dist/css'))
		.pipe(rev.manifest())
		.pipe(rename('css-manifest.json'))
		.pipe(gulp.dest('./dist/rev'));
})

gulp.task('image',function () {
	return gulp.src('./static/images/*',{base:'./'})
		.pipe(imagemin())
		.pipe(rev())
		.pipe(gulp.dest('./dist'))
		.pipe(rev.manifest())
		.pipe(rename('image-manifest.json'))
		.pipe(gulp.dest('./dist/rev'));
})
// gulp.task('html',function () {
// 	return gulp.src('./index.html')
// 		.pipe(gulp.dest('./dist'));
// })
gulp.task('useref',function(){
	return gulp.src('./index.html')
		.pipe(useref())
		.pipe(gulpif('*.js',uglify()))
		.pipe(gulpif('*.js',rev()))
		.pipe(gulp.dest('./dist'))
		.pipe(rev.manifest())
		.pipe(rename('js-manifest.json'))
		.pipe(gulp.dest('./dist/rev'))
})
//替换
gulp.task('rev',['css','image','useref'],function () {
	return gulp.src(['./dist/rev/*.json','./dist/index.html'])
		.pipe(revCollector())
		.pipe(gulp.dest('./dist'));
})
gulp.task('default',['rev'])