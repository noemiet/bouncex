  module.exports = function(grunt) {
  /**
   * Initialize grunt
   */
  grunt.initConfig({

    /**
     * Read package.json
     */
    pkg: grunt.file.readJSON('package.json'),


    /**
     * Set banner
     */
    banner: '/**\n' +
    '<%= pkg.title %> - <%= pkg.version %>\n' +
    '<%= pkg.homepage %>\n' +
    'Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>\n' +
    'License: <%= pkg.license %>\n' +
    '*/\n',

      // Browser Sync integration
    browserSync: {
      bsFiles: ['assets/*.js', 'assets/*.css', '!**/node_modules/**/*', './*.html'],
      options: {
          server: {
              baseDir: './' // make server from root dir
          },
          port: 8000,
          ui: {
              port: 8080,
              weinre: {
                  port: 9090
              }
          },
          open: false
      }
    },


      /**
     * Watch
     * @github.com/gruntjs/grunt-contrib-watch
     */
    watch: {
      jade: {
        files: ['jade/**/*'],
        tasks: ['jade_compile'],
        options: {
          interrupt: false,
          spawn: false,
        },
      },

      js: {
        files: [ "js/**/*", "!js/init.js"],
        tasks: ['js_compile'],
        options: {
          interrupt: false,
          spawn: false,
        },
      },

      css: {
        files: ['assets/*.css'],
        tasks: ['css_compile'],
        options: {
          interrupt: false,
          spawn: false,
        },
      }
    },

    //  Concurrent
    concurrent: {
      options: {
        logConcurrentOutput: true,
        limit: 10,
      },
      monitor: {
        tasks: ["watch:jade", "watch:js", "watch:css", "notify:watching", 'server']
      },
    },


//  Notifications
    notify: {
      watching: {
        options: {
          enabled: true,
          message: 'Watching Files!',
          title: "BounceX", // defaults to the name in package.json, or will use project directory's name
          success: true, // whether successful grunt executions should be notified automatically
          duration: 1 // the duration of notification in seconds, for `notify-send only
        }
      },

      css_compile: {
        options: {
          enabled: true,
          message: 'CSS Compiled!',
          title: "BounceX",
          success: true,
          duration: 1
        }
      },

      js_compile: {
        options: {
          enabled: true,
          message: 'JS Compiled!',
          title: "BounceX",
          success: true,
          duration: 1
        }
      },

      jade_compile: {
        options: {
          enabled: true,
          message: 'Jade Compiled!',
          title: "BounceX",
          success: true,
          duration: 1
        }
      },

      server: {
        options: {
          enabled: true,
          message: 'Server Running!',
          title: "Noemie Design",
          success: true,
          duration: 1
        }
      }
    },


      // Live reload files
      livereload: {
        options: { livereload: true },
        files: [
          '<%= dir.css %>/**/*.css',  // all .css files in css/ dir
          '<%= dir.js %>/**/*.js',    // all .js files in js/ dir
          '**/*.{html,php}',          // all .html + .php files
          '<%= dir.img %>/**/*.{png,jpg,jpeg,gif,svg}'  // img files in img/ dir
        ]
      }
    
    
  });

  /**
   * Load the plugins specified in `package.json`
   */
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-browser-sync');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-jade');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-notify');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-concurrent');

  /**
   * Default Task
   * run `grunt`
   */
 

  grunt.registerTask('jade_compile', ['jade', 'notify:jade_compile']);
  grunt.registerTask('js_compile', ['concat:js', 'notify:js_compile']);
  grunt.registerTask('css_compile',['notify:css_compile']);
  grunt.registerTask('server', ['browserSync','notify:server']);
  /**
   * Production tast, use for deploying
   * run `grunt production`
   */
  // grunt.registerTask('production', ['concat:js', 'uglify', 'sass:dist']);
 
  grunt.registerTask('default', ['concurrent:monitor']);
};


