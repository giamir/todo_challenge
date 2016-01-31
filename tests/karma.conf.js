module.exports = function(config) {
  config.set({

    basePath: '../',
    frameworks: ['jasmine'],
    files: [
      'bower_components/angular/angular.js',
      'bower_components/angular-route/angular-route.js',
      'bower_components/angular-resource/angular-resource.js',
      'bower_components/angular-mocks/angular-mocks.js',
      'js/**/*.js',
      'tests/mocks/*.js',
      'tests/**/*.spec.js'
    ],

    exclude: [],

    preprocessors: {
      'js/**/*.js': ['coverage']
    },

    reporters: ['spec', 'coverage'],

    port: 9876,

    colors: true,

    logLevel: config.LOG_INFO,

    autoWatch: true,

    // browsers: ['Chrome'],
    browsers: ['PhantomJS'],

    singleRun: true,

    coverageReporter: {
      type : 'html',
      dir : 'coverage/'
    }

  });
};
