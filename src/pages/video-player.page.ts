import {Page, Locator} from '@playwright/test';
import {video_player_locators as locators} from '../locators/video-player.locators';
import {BASE_URLS} from '../config/urls.ts';

export class VideoPlayerPage {
    readonly page: Page;
    readonly video: Locator;
    readonly url: string;

    constructor(page: Page) {
        this.page = page;
        this.video = page.locator(locators.video);
        this.url = BASE_URLS.main_page;
    }

    async goto() {
        await this.page.goto(this.url);
    }

    async playVideo() {
        await this.page.evaluate(() => {
            const video = document.getElementById('video') as HTMLVideoElement | null;
            video?.play();
        });
    }

    async pauseVideo() {
        await this.page.evaluate(() => {
            const video = document.getElementById('video') as HTMLVideoElement | null;
            video?.pause();
        });
    }

    async seekTo(seconds: number) {
        await this.page.evaluate((sec) => {
            const video = document.getElementById('video') as HTMLVideoElement | null;
            if (video) video.currentTime = sec;
        }, seconds);
    }

    async getCurrentTime(): Promise<number> {
        return await this.page.evaluate(() => {
            const video = document.getElementById('video') as HTMLVideoElement | null;
            return video?.currentTime ?? 0;
        });
    }

    async isPlaying(): Promise<boolean> {
        return await this.page.evaluate(() => {
            const video = document.getElementById('video') as HTMLVideoElement | null;
            return video ? !video.paused : false;
        });
    }

    async scrollToVideo() {
        await this.video.scrollIntoViewIfNeeded();
    }
    async scrollToPageBottom() {
        await this.page.evaluate(() =>
            window.scrollTo({ top: document.body.scrollHeight })
        );
    }

    async waitForMetadata() {
        await this.page.waitForFunction(() => {
            const v = document.getElementById('video') as HTMLVideoElement;
            return v?.readyState >= 1;
        });
    }

    async collectEventsDuringAction(action: () => Promise<void>): Promise<string[]> {
        const events: string[] = [];
        let lastEventTime = Date.now();
        const quietMs = 2000;
        const maxWaitMs = 3000;

        const listener = (req: import('@playwright/test').Request) => {
            if (req.url().endsWith(BASE_URLS.api_event) && req.method() === 'POST') {
                const body = JSON.parse(req.postData() ?? '{}');
                if (body?.type) {
                    events.push(body.type);
                    lastEventTime = Date.now();
                }
            }
        };

        this.page.on('request', listener);
        await action();
        while (Date.now() - lastEventTime < quietMs && Date.now() - lastEventTime < maxWaitMs) {
            await new Promise(r => setTimeout(r, 50));
        }
        this.page.off('request', listener);
        return events;
    }
}
