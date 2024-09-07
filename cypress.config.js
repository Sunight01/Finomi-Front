import { defineConfig } from "cypress";
import pkg from "@cypress/vite-dev-server";

const { startDevServer } = pkg;

export default defineConfig({
  projectId: "c945xb",

  component: {
    devServer: {
      framework: "react",
      bundler: "vite",
    },
  },

  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
      on("dev-server:start", (options) => {
        startDevServer({ options });
      });
      return config;
    },
  },
});
