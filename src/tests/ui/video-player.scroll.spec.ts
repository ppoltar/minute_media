import { test } from '../../fixtures/video-player.fixture';
import { expect } from '@playwright/test';

test.describe('Video Player Scroll Event', () => {
    test('Scroll triggers scroll event sent to backend @ui @scroll', async ({ videoPlayerPage }) => {
        const events = await videoPlayerPage.collectEventsDuringAction(async () => {
            await videoPlayerPage.scrollToVideo();
            await videoPlayerPage.scrollToPageBottom()
        });
        expect(events).toContain('scroll');
    });
});
