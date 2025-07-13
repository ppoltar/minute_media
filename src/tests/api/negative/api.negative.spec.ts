import { test } from '../../../fixtures/video-player.fixture.ts';
import { negativeCases } from './api.negative.data';
import { expect } from '@playwright/test';

test.describe('API /api/event POST validation - Negative cases @negative @api' , () => {
    for (const { name, data } of negativeCases) {
        test(`Negative case - ${name}`, async ({ apiContext }) => {
            const response = await apiContext.post('/api/event', { data: data() });
            expect(response.status()).toBeGreaterThanOrEqual(400);
        });
    }
});
