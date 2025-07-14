    import { test } from '../../fixtures/video-player.fixture';
    import { expect } from '@playwright/test';

    test.describe('Video Player Seek Controls', () => {
        test('Seek triggers seeked event and updates video time @ui @seek', async ({ videoPlayerPage }) => {
            const seekTime = 7;
            const events = await videoPlayerPage.collectEventsDuringAction(() => videoPlayerPage.seekTo(seekTime));
            expect(events).toContain('seeked');
            expect(await videoPlayerPage.getCurrentTime()).toBeCloseTo(seekTime, 1);
        });
    });
