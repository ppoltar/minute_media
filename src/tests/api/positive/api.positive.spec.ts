import { test } from '../../../fixtures/video-player.fixture';  // your custom test with fixtures
import { expect } from '@playwright/test';
import { positiveCases } from './api.positive.data.ts';
import {BASE_URLS} from '../../../config/urls.ts'

test.describe.parallel(`API --> ${BASE_URLS.api_event} POST validation - Positive cases @api @positive`, () => {
    for (const { name, data } of positiveCases) {
        test(`Positive case - ${name}`, async ({ apiContext }) => {
            const response = await apiContext.post(BASE_URLS.api_event, { data: data() });
            expect(response.status()).toBe(200);
        });
    }
});
