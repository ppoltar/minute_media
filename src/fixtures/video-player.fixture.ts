import { test as base, APIRequestContext, request } from '@playwright/test';
import { VideoPlayerPage } from '../pages/video-player.page';

type VideoPlayerFixture = {
    videoPlayerPage: VideoPlayerPage;
    apiContext: APIRequestContext;
};

export const test = base.extend<VideoPlayerFixture>({
    videoPlayerPage: async ({ page }, use) => {
        const videoPlayerPage = new VideoPlayerPage(page);
        await videoPlayerPage.goto();
        await videoPlayerPage.waitForMetadata()
        await use(videoPlayerPage);
    },

    apiContext: async ({}, use) => {
        const apiContext = await request.newContext();
        await use(apiContext);
        await apiContext.dispose();
    },
});
