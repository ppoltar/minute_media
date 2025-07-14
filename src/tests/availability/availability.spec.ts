import { test } from '../../fixtures/video-player.fixture';
import { expect } from '@playwright/test';

test.describe('Availability test @availability', () => {
    test('Main page loads and video player is ready', async ({ videoPlayerPage }) => {
        const page = videoPlayerPage;
        await expect(page.video).toBeVisible();
        await expect(page.video).toHaveAttribute('controls', '');
        await expect(page.page).toHaveTitle('Video Event Tracker');
    });
});
