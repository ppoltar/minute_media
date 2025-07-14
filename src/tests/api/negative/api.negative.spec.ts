import { test } from '../../../fixtures/video-player.fixture.ts';
import { negativeCases } from './api.negative.data';
import { expect } from '@playwright/test';
import {BASE_URLS} from '../../../config/urls.ts'

test.describe.parallel(`API --> ${BASE_URLS.api_event} - Negative cases @negative @api` , () => {
    for (const { name, data } of negativeCases) {
        test(`Negative case - ${name}`, async ({ apiContext }) => {
            const response = await apiContext.post(BASE_URLS.api_event, { data: data() });
            expect(response.status()).toBeGreaterThanOrEqual(400);
        });
    }
});
