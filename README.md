## Setup

- npm i -g gulp-cli
- npm i -D gulp

## Common Tasks

- Minification of scripts and styles
- Concatenation (bundling)
- Cache Busing
- Testing, Linting, & Optimization
- Dev Servers

## How it Works

- Built on node streams
- Pipelines / .pipe() operator
- Single Purpose Plugins
- Files not affected until all plugins are processed

## Basic Functions

- gulp.task - Define tasks
- gulp.src - Point at files to use
- gulp.dest - Points to folder to output
- gulp.watch - Watch files and folders for changes
  series
  parallel

## Signaling Execution Finish

### 1. Return a Stream

This is not really an option if you're only trying to print something, but it's probably the most frequently used async completion mechanism since you're usually working with gulp streams.

```
const print = require('gulp-print');

gulp.task('message', function() {
  return gulp.src('package.json')
    .pipe(print(function() { return 'HTTP Server Started'; }));
});
```

The important part here is the return statement. If you don't return the stream, gulp can't determine when the stream has finished.

### 2. Return a Promise

This is a much more fitting mechanism for your use case. Note that most of the time you won't have to create the Promise object yourself, it will usually be provided by a package (e.g. the frequently used del package returns a Promise).

```
gulp.task('message', function() {
  return new Promise(function(resolve, reject) {
    console.log("HTTP Server Started");
    resolve();
  });
});
```

Using async/await syntax this can be simplified even further. All functions marked async implicitly return a Promise so the following works too (if your node.js version supports it):

```
gulp.task('message', async function() {
  console.log("HTTP Server Started");
});
```

### 3. Call the callback function

Gulp automatically passes a callback function to your task as its first argument. Just call that function when you're done:

```
gulp.task('message', function(done) {
  console.log("HTTP Server Started");
  done();
});
```

### 4. Return a child process

This is mostly useful if you have to invoke a command line tool directly because there's no node.js wrapper available. It works for your use case but obviously I wouldn't recommend it (especially since it's not very portable):

```
gulp.task('message', function() {
  return spawn('echo', ['HTTP', 'Server', 'Started'], { stdio: 'inherit' });
});
```

### 5. Return a RxJS Observable

```
const of = require('rxjs').of;

gulp.task('message', function() {
  const o = of('HTTP Server Started');
  o.subscribe(function(msg) { console.log(msg); });
  return o;
});
```

### 6. Return an EventEmitter

Not really something you're going to use unless you're already using an EventEmitter for some reason.

```
gulp.task('message3', function() {
  const e = new EventEmitter();
  e.on('msg', function(msg) { console.log(msg); });
  setTimeout(() => { e.emit('msg', 'HTTP Server Started'); e.emit('finish'); });
  return e;
});
```

## Misc.

For TypeScript, rename to gulpfile.ts and install the ts-node module.
For Babel, rename to gulpfile.babel.js and install the @babel/register module.

Most new versions of node support most features that TypeScript or Babel provide,
except the import/export syntax. When only that syntax is desired,
rename to gulpfile.esm.js and install the esm module.

Node's module resolution allows you to replace your gulpfile.js file with a directory named gulpfile.js that contains an index.js file which is treated as a gulpfile.js. This directory could then contain your individual modules for tasks. If you are using a transpiler, name the folder and file accordingly.
