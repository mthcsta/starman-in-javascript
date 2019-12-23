module.exports = function(grunt) {
    grunt.loadNpmTasks("grunt-contrib-concat");
  
    grunt.initConfig({
        concat: {
          dist: {
              src: ["inc/*.js"]
            , dest: "main.js"
          }
        }
    });
  };
  