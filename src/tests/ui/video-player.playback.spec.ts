import { test } from '../../fixtures/video-player.fixture';
import { expect } from '@playwright/test';
import {BASE_URLS} from "../../config/urls.ts";

test.describe('Video Player Playback Controls', () => {
    test('Play button triggers play event and video plays', async ({ videoPlayerPage, page }) => {
        const [request] = await Promise.all([
            page.waitForRequest(req => req.url().endsWith(BASE_URLS.api_event) && req.method() === 'POST'),
            videoPlayerPage.playVideo(),
        ]);

        const postData = JSON.parse(request.postData() ?? '{}');
        expect(postData.type).toBe('play');

        expect(await videoPlayerPage.isPlaying()).toBe(true);
    });

    test('Pause button triggers pause event and video pauses', async ({ videoPlayerPage, page }) => {
        await videoPlayerPage.playVideo();

        const [request] = await Promise.all([
            page.waitForRequest(req => req.url().endsWith(BASE_URLS.api_event) && req.method() === 'POST'),
            videoPlayerPage.pauseVideo(),
        ]);

        const postData = JSON.parse(request.postData() ?? '{}');
        expect(postData.type).toBe('pause');

        expect(await videoPlayerPage.isPlaying()).toBe(false);
    });
});
