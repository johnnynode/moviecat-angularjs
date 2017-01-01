/**
 * Created by Johnny on 2017/1/1 0001.
 */
// 载入GULP 核心对象
const gulp = require('gulp');
const cssnano = require('gulp-cssnano');
const uglify = require('gulp-uglify');
const concat = require('gulp-concat');
const htmlmin = require('gulp-htmlmin'); // 压缩html
const _if = require('gulp-if');
const useref = require('gulp-useref');
const ngAnnotate = require('gulp-ng-annotate');
const del = require('del'); // 清空文件和文件夹
const stripDebug = require('gulp-strip-debug'); // Strip console, alert, and debugger statements
const autoprefixer = require('gulp-autoprefixer');
const sh = require('shelljs');
// 压缩css 和 js
gulp.task('handleScripts', function() {
	return gulp.src('app/index.html')
			.pipe(useref())
			.pipe(_if('*.js', stripDebug()))
			.pipe(_if('*.js', ngAnnotate()))
			.pipe(_if('*.js', uglify()))
			.pipe(_if('*.css', autoprefixer()))
			.pipe(_if('*.css', cssnano()))
			.pipe(gulp.dest('dist'));
});

// 压缩html任务 这个选项先注释掉 : minifyJS: true ,依赖 cssAndJs ,是让任务cssAndJs 先执行
gulp.task('html',['handleScripts'], function(){
	return gulp.src(['app/**/*.html','!app/index.html','!app/bower_components/**'])
			.pipe(htmlmin({
				removeComments: true,
				collapseWhitespace: true,
				minifyJS: true
			}))
			.pipe(gulp.dest('dist'));
});

// 所有构建任务集合
gulp.task('all',['html'], function(){
	console.log('项目构建完毕!');
});

// 清理dist目录
gulp.task('clean', function(){
	return del(['dist']).then(function(){
		console.log('dist 目录清空完毕!');
	});
});

gulp.task('default',['clean'], function () {
	sh.exec('clear');
	console.log('项目构建开始');
	sh.exec('gulp all');
});
