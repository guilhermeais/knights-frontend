import { defineConfig } from "cypress";
import "dotenv/config";
export default defineConfig({
  chromeWebSecurity: false,
  component: {
    devServer: {
      framework: "nuxt",
      bundler: "webpack",
    },
  },
  e2e: {
    setupNodeEvents(on, config) {},
    baseUrl: "http://localhost:3000",
    env: process.env,
  },
});
