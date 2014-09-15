var grunt = require('grunt');
var BUILD_PATH = 'public_grunt',
    SRC_PATH = 'src';

grunt.loadNpmTasks('grunt-contrib-clean');
grunt.loadNpmTasks('grunt-contrib-sass');
grunt.loadNpmTasks('grunt-contrib-coffee');
grunt.loadNpmTasks('grunt-contrib-jade');
grunt.loadNpmTasks('grunt-contrib-concat');

/**steps:  
    1 clear bulid path
    2 join all scss file --> compile to "main.css" --> copy to bulid path 
    3 join all coffee file --> compile to "main.js" --> copy to bulid path
    4 compile index.jade to index.html  --> copy to bulid path 
**/

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
            options: {
                trace: true
            },
            files: [{
                cwd: SRC_PATH + '/styles',
                src: ['**/*.scss'],
                dest: '.sass-cache/styles',
                expand: true,
                ext: '.css'
            }]
        }        
        // dist: {
        //     files: [{
        //         //'public_grunt/assets/styles/main.css': SRC_PATH + '/styles/*.scss'
        //         expand: true,
        //         cwd: SRC_PATH + '/styles',
        //         src: ['**/*.scss'],
        //         dest: BUILD_PATH + '/assets/styles',
        //         ext: '.css'
        //     }]
        // }
        // dist: {                            
        //     options: {                       
        //         expand: true
        //     },
        //     src: SRC_PATH + '/styles/*.sass', 
        //     dest: BUILD_PATH + '/assets/styles/main.css'
        // }
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
grunt.registerTask('css', ['clean', 'sass', 'concat']);


//TODO: for concat libs like jquery, angularjs... to one single file
// concat: {
//   options: {
//     separator: ';',
//   },
//   dist: {
//     src: ['src/intro.js', 'src/project.js', 'src/outro.js'],
//     dest: 'dist/built.js',
//   },
// },