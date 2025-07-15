    import { test } from '../../fixtures/video-player.fixture';
    import { expect } from '@playwright/test';

    test.describe('Video Player Playback Controls', () => {
        test('Play button triggers play event and video plays @ui @play', async ({ videoPlayerPage }) => {
            const events = await videoPlayerPage.collectEventsDuringAction(() => videoPlayerPage.playVideo());
            expect(events).toContain('play');
            expect(await videoPlayerPage.isPlaying()).toBe(true);
        });

        test('Play, Pause button triggers pause event and video pauses @ui @pause', async ({ videoPlayerPage }) => {
            await videoPlayerPage.playVideo();
            const events = await videoPlayerPage.collectEventsDuringAction(() => videoPlayerPage.pauseVideo());
            expect(events).toContain('pause');
            expect(await videoPlayerPage.isPlaying()).toBe(false);
        });
    });
