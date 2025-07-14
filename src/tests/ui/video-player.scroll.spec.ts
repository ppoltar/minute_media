import { test } from '../../fixtures/video-player.fixture';
import { expect } from '@playwright/test';
import {BASE_URLS} from "../../config/urls.ts";

test.describe('Video Player Scroll Event', () => {
    test('Scroll triggers scroll event sent to backend', async ({ videoPlayerPage, page}) => {
        // scroll page to bottom to trigger event
        const [request] = await Promise.all([
            page.waitForRequest(req => req.url().endsWith(BASE_URLS.api_event) && req.method() === 'POST'),
            videoPlayerPage.scrollToVideo().then(() =>
                page.evaluate(() => window.scrollTo(0, document.body.scrollHeight))
            ),
        ]);

        const postData = JSON.parse(request.postData() ?? '{}');
        expect(postData.type).toBe('scroll');
    });
});
