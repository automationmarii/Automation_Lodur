/* eslint-disable global-require */
// eslint-disable-next-line import/no-extraneous-dependencies
const { defineConfig } = require("cypress");

module.exports = defineConfig({
  numTestsKeptInMemory: 15,
  defaultCommandTimeout: 50000,
  pageLoadTimeout: 200000,
  requestTimeout: 50000,
  responseTimeout: 10000,
  chromeWebSecurity: false,
  /* retries: {
    runMode: 1,
    openMode: 0,
  }, */
  reporter: "cypress-mochawesome-reporter",
  reporterOptions: {
    charts: true,
    reportPageTitle: "Test Report",
    //embeddedScreenshots: true,
    // inlineAssets: false,
    //ignoreVideos:true,
    quiet: true,
    //saveAllAttempts: false,
    //hideTestCode: false,
    //hideTestDescriptions: false,
    overwrite: true,
    json: true,
    html: false,
    embeddedVideos: true,
    screenshotPath: "cypress/reports/screenshots",
    videoPath: "cypress/reports/videos",
    reportDir: "cypress/reports",
  },

  userAgent:
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.190 Safari/537.36",
  viewportHeight: 768,
  viewportWidth: 1266,
  e2e: {
    setupNodeEvents: function (on, config) {
      require("cypress-mochawesome-reporter/plugin")(on);
    },
  },
});
