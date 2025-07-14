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

    async waitForMetadata() {
        await this.page.waitForFunction(() => {
            const v = document.getElementById('video') as HTMLVideoElement;
            return v?.readyState >= 1;
        });
    }
}
