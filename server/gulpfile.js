const gulp = require('gulp');
const ts = require('gulp-typescript');
const nodemon = require('gulp-nodemon');
const fs = require('fs');

const data = fs.readFileSync('tsconfig.json', 'utf8');
const tsConfig = JSON.parse(data);
const tsProject = ts.createProject('tsconfig.json');

gulp.task('build', gulp.series(() => {
    return tsProject.src().pipe(tsProject()).js.pipe(gulp.dest(tsConfig.compilerOptions.outDir));
}));

gulp.task('watch', gulp.series('build', () => {
    gulp.watch(tsConfig.include, ['build']);
}));

gulp.task('start', gulp.series('build', () => {
    nodemon({
        script: `${tsConfig.compilerOptions.outDir}/index.js`,
        ext: 'ts',
        tasks: ['build']
    });
}));