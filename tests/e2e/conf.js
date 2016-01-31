exports.config = {

  seleniumAddress: 'http://localhost:4444/wd/hub',
  capabilities: { 'browserName': 'chrome' },
  specs: ['todoListFeature.js'],

  jasmineNodeOpts: {
    showColors: true
  },

  onPrepare: function() {
    var SpecReporter = require('jasmine-spec-reporter');
    jasmine.getEnv().addReporter(new SpecReporter({displayStacktrace: 'all'}));
  }
};
