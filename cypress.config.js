const { defineConfig } = require("cypress");

module.exports = defineConfig({
  chromeWebSecurity: false,
  e2e: {
    setupNodeEvents(on, config) {
    },
    baseUrl: 'https://www.globalsqa.com/angularJs-protractor/BankingProject/#/',
    env: {
      bffUrl: 'https://bff.example.com/',
      MAILSAC_API_KEY: 'xxxxxxsamplexxxxxxx'
    }
  },
});
