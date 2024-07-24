import { defineConfig } from "cypress";

export default defineConfig({
  chromeWebSecurity: false,
  component: {
    devServer: {
      framework: "nuxt",
      bundler: "webpack",
    },
  },
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    baseUrl: "http://localhost:3000",
    testIsolation: false,
  },
});
