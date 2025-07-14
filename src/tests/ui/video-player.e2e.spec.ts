import { test } from '../../fixtures/video-player.fixture';
import { expect } from '@playwright/test';

test.describe('E2E Test - All available functions', () => {
    test('E2E - Play, seek, pause, play, scroll - collect all events and verify @ui @e2e', async ({ videoPlayerPage }) => {
    const events = await videoPlayerPage.collectEventsDuringAction(async () => {
        await videoPlayerPage.playVideo();
        await videoPlayerPage.seekTo(6);
        await videoPlayerPage.pauseVideo();
        await videoPlayerPage.playVideo();
        await videoPlayerPage.scrollToPageBottom();
    });
    expect(events).toEqual(expect.arrayContaining(['play', 'seeked', 'pause', "play", 'scroll']));
 });
});
