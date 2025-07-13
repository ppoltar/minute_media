import { test } from '../../../fixtures/video-player.fixture';  // your custom test with fixtures
import { expect } from '@playwright/test';
import { positiveCases } from './api.positive.data.ts';

test.describe('API /api/event POST validation - Positive cases @api @positive', () => {
    for (const { name, data } of positiveCases) {
        test(`Positive case - ${name}`, async ({ apiContext }) => {
            const response = await apiContext.post('/api/event', { data: data() });
            expect(response.status()).toBe(200);
        });
    }
});
