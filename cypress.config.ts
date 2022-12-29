import { defineConfig } from 'cypress';

export default defineConfig({
  component: {
    viewportHeight: 789,
    viewportWidth: 1600,
    devServer: {
      framework: 'angular',
      bundler: 'webpack',
    },
    specPattern: '**/*.cy.ts',
  },

  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
