import { defineConfig } from '@playwright/test';

const isCI = !!process.env.CI || !!process.env.DOCKER;

export default defineConfig({
    testDir: './src/tests',
    timeout: 30_000,
    retries: isCI ? 2 : 0,    //Avoid unnecessary retries locally
    workers: 5,
    reporter: isCI
        ? [['list'], ['html', { outputFolder: 'playwright-report', open: 'never' }]] // In CI: generate report but don't open it
        : [['list'], ['html', { outputFolder: 'playwright-report'}]], // Locally

    use: {
        headless: isCI ? true : false,
        screenshot: isCI ? 'only-on-failure' : 'on',
        video:  isCI ? 'retain-on-failure' : 'on',
        trace: isCI ? 'retain-on-failure' : 'on',
        channel: 'chrome', // runs against the real Chrome
    },

});
