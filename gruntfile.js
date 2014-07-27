var grunt = require('grunt');

grunt.initConfig({
  sass: {
    dist: {
      files: [{
        cwd: 'app/styles',
        src: '**/*.scss',
        dest: '../.tmp/styles',
        expand: true,
        ext: '.css'
      }]
    }
  },
  watch: {
    styles: {
      files: ['app/styles/{,*/}*.scss'],
      tasks: ['sass:dist']
    }
  }
});
grunt.registerTask('default', ['styles', 'watch']);