grunt and gulp
=====================
A comperation of grunt and gulp, 
to find out what's the difference between Grunt and Gulp

steps: 
-------------------

src path
```
src
├── styles
│   ├── main.scss
│   ├── _navbar.scss
│   └── _footer.scss
├── app
│   ├── main.coffee
│   ├── module_1.coffee
│   └── module_2.coffee
└── tpls
    ├── _footer.jade
    ├── index.jade
    ├── _navbar.jade
    └── _mainContent.jade
```

build path
```
public
├── assets
│   ├── styles
│   │   └── main.css
│   └── js
│       └── main.js
└── index.html
```


1. clear bulid path
2. join all scss file --> compile to "main.css" --> copy to bulid path
3. join all coffee file --> compile to "main.js" --> copy to bulid path
4. compile index.jade to index.html  --> copy to bulid path 

Grunt
-------

A little bit over-configurated and not so agile, not easy to read

```javascript
grunt.initConfig({
    clean: {
        dist: {
            src: [BUILD_PATH]
        }
    }, 

    sass: {
        //! NOT support multiple .sass file in directory, have to use @import in css file
        //https://github.com/gruntjs/grunt-contrib-sass/issues/55
        dist: {
            files: [{
                cwd: SRC_PATH + '/styles',
                src: ['**/*.scss'],
                dest: '.sass-cache/styles', //have to compile to a tmp directory, and concat with "concat" task bellow
                expand: true,
                ext: '.css'
            }]
        }        
    },

    concat: {
        sass: {
            src: ['.sass-cache/styles/**/*.css'],
            dest: BUILD_PATH + '/assets/styles/main.css'
        }
    },

    coffee: {            
        dist: {
            options: {
                bare: true
            },
            files: {
                'public_grunt/assets/js/main.js': [SRC_PATH + '/app/*.coffee']
            }
        }
    },

    jade: {            
        dist: {
            options: {
                pretty: true
            },
            files: {
                'public_grunt/index.html': [SRC_PATH + '/tpls/index.jade'],
            }
        }
    }
});

grunt.registerTask('default', ['clean', 'sass', 'concat', 'coffee', 'jade']);
```


Gulp 
--------

Simple, flexible and graceful, just as a working-flow to make the job done

```javascript
var BUILD_PATH = 'public',
    paths = {
        jade: 'src/tpls/index.jade',
        sass: 'src/styles/**/*.scss',
        scripts: [
            'src/app/module_1.coffee',
            'src/app/module_2.coffee',
            'src/app/main.coffee',
        ]            
    };

// ------------------------------------------------
// - Tasks
// ------------------------------------------------
gulp.task('clean', function () {
  return gulp.src(BUILD_PATH + '/**/*', { read: false })
    .pipe(rimraf({ force: true }));
});

gulp.task('jade', function () {
  return gulp.src(paths.jade)
    .pipe(jade({ pretty: true }))
    .pipe(gulp.dest(BUILD_PATH));
});

gulp.task('coffee', function() {
  gulp.src(paths.scripts)
    .pipe(gulpCoffee({bare: true}).on('error', gutil.log))
    .pipe(concat('main.js'))
    .pipe(gulp.dest(BUILD_PATH + '/assets/js'));
});

gulp.task('sass', function () {
  return gulp.src(paths.sass)
    .pipe(concat('main.sass'))
    .pipe(sass({ errLogToConsole: true }))
    //.pipe(minifycss())
    .pipe(gulp.dest(BUILD_PATH + '/assets/styles'));
});

gulp.task('default', ['clean'], function () {
  gulp.start('sass', 'coffee', 'jade');
});
```

Witch is better?
----------------
Grunt are going to include adding support for piping data between multiple tasks, 
 and emitting task output as data events in it's roadmap. 
That maight make grunt better and easier to use in the featrue.

Gulp's style is "Streams all the way down". This is the philosophy I prefer more.


Other Article
-------
[gulp-grunt-whatever](http://blog.ponyfoo.com/2014/01/09/gulp-grunt-whatever)

[presentation-build-wars-gulp-vs-grunt](http://markdalgleish.github.io/presentation-build-wars-gulp-vs-grunt/)
