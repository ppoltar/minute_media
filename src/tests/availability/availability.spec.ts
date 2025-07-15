    import { test } from '../../fixtures/video-player.fixture';
    import { expect } from '@playwright/test';

    test.describe('Availability test', () => {
        test('Main page loads and video player is ready @availability @ui', async ({ videoPlayerPage }) => {
            const page = videoPlayerPage;
            await expect(page.video).toBeVisible();
            await expect(page.video).toHaveAttribute('controls', '');
            await expect(page.page).toHaveTitle('Video Event Tracker');
        });
    });
