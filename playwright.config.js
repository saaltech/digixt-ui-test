// @ts-check
const { devices } = require('@playwright/test');
const config = {
  testDir: './tests',
  timeout: 30 * 1000,
  expect: {
    timeout: 5000
  },
  reporter: 'html',
  use: {
    actionTimeout: 0,
    baseURL: 'https://dev.digixt.ae',
    trace: 'on',
    browserName : 'chromium',
    headless : true,
    screeenshot : 'on'
  },
};

module.exports = config;



/* Configure projects for major browsers */
  // projects: [
  //   {
  //     name: 'chromium',
  //     use: {
  //       ...devices['Desktop Chrome'],
  //     },
  //   },

  //   {
  //     name: 'firefox',
  //     use: {
  //       ...devices['Desktop Firefox'],
  //     },
  //   },

  //   {
  //     name: 'webkit',
  //     use: {
  //       ...devices['Desktop Safari'],
  //     },
  //   },

  //   /* Test against mobile viewports. */
  //   // {
  //   //   name: 'Mobile Chrome',
  //   //   use: {
  //   //     ...devices['Pixel 5'],
  //   //   },
  //   // },
  //   // {
  //   //   name: 'Mobile Safari',
  //   //   use: {
  //   //     ...devices['iPhone 12'],
  //   //   },
  //   // },

  //   /* Test against branded browsers. */
  //   // {
  //   //   name: 'Microsoft Edge',
  //   //   use: {
  //   //     channel: 'msedge',
  //   //   },
  //   // },
  //   // {
  //   //   name: 'Google Chrome',
  //   //   use: {
  //   //     channel: 'chrome',
  //   //   },
  //   // },
  // ],

  /* Folder for test artifacts such as screenshots, videos, traces, etc. */
  // outputDir: 'test-results/',

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   port: 3000,
  // },
  /* Run tests in files in parallel */
  //fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  //forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  //retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  //workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */