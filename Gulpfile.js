const gulp = require("gulp");
const imagemin = require("gulp-imagemin");
const uglify = require("gulp-uglify");

// Logs message
gulp.task("message", (done) => {
  console.log("Gulp is running.");
  done();
});

// Copy all html files from src => dist
gulp.task("copyHtml", (done) => {
  gulp.src("src/*.html").pipe(gulp.dest("dist"));
  done();
});

// Optimize images
gulp.task("imageMin", (done) => {
  gulp.src("src/images/*").pipe(imagemin().pipe(gulp.dest("dist/images")));
  done();
});

// Minify Js
gulp.task("minify", (done) => {
  gulp.src("src/js/*.js").pipe(uglify()).pipe(gulp.dest("dist/js"));
  done();
});

// bundle
gulp.task("bundle", function () {
  gulp
    .src("src/js/*.js")
    .pipe(concat("main.js"))
    .pipe(uglify())
    .pipe(gulp.dest("dist/js"));
});

gulp.task("default", ["message", "copyHtml", "imageMin", "bundle"]);

gulp.task("watch", function () {
  gulp.watch("src/js/*.js", ["scripts"]);
  gulp.watch("src/images/*", ["imageMin"]);
  gulp.watch("src/sass/*.scss", ["sass"]);
  gulp.watch("src/*.html", ["copyHtml"]);
});
