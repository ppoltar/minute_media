    import { test } from '../../fixtures/video-player.fixture';
    import { expect } from '@playwright/test';
    import {BASE_URLS} from "../../config/urls.ts";

    test.describe('Video Player Seek Controls', () => {
        test('Seek triggers seeked event and updates video time', async ({ videoPlayerPage, page }) => {
            const seekTime = 7;

            const [request] = await Promise.all([
                page.waitForRequest(req => req.url().endsWith(BASE_URLS.api_event) && req.method() === 'POST'),
                videoPlayerPage.seekTo(seekTime),
            ]);

            const postData = JSON.parse(request.postData() ?? '{}');
            expect(postData.type).toBe('seeked');
            expect(postData.videoTime).toBeCloseTo(seekTime, 1);

            expect(await videoPlayerPage.getCurrentTime()).toBeCloseTo(seekTime, 1);
        });
    });
