const { defineConfig } = require("cypress");

module.exports = defineConfig({
  chromeWebSecurity: false,
  e2e: {
    setupNodeEvents(on, config) {
    },
    baseUrl: 'https://example.com/',
    env: {
      bffUrl: 'https://bff.example.com/',
      MAILSAC_API_KEY: 'xxxxxxsamplexxxxxxx'
    }
  },
});
