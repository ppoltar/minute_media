export const missingVideoTimeEvent = () => ({
    userId: 'user-123',
    type: 'play',
    // videoTime missing
    timestamp: new Date().toISOString(),
});

export const missingUserIdEvent = () => ({
    // userId missing
    type: 'pause',
    videoTime: 10.0,
    timestamp: new Date().toISOString(),
});

export const wrongTypeEvent = () => ({
    userId: 'user-123',
    type: 123, // should be string
    videoTime: 20.5,
    timestamp: new Date().toISOString(),
});

export const emptyPayload = () => ({});

export const invalidTimestampFormatEvent = () => ({
    userId: 'user-123',
    type: 'play',
    videoTime: 5,
    timestamp: 'not-a-valid-timestamp',
});

export const negativeVideoTimeEvent = () => ({
    userId: 'user-123',
    type: 'seeked',
    videoTime: -5, // invalid negative time
    timestamp: new Date().toISOString(),
});

export const extraUnexpectedFieldEvent = () => ({
    userId: 'user-123',
    type: 'play',
    videoTime: 10,
    timestamp: new Date().toISOString(),
    extraField: 'unexpected',
});

export const sqlInjectionAttempt = () => ({
    userId: 'user-123',
    type: "play'; DROP TABLE users; --",
    videoTime: 10,
    timestamp: new Date().toISOString(),
});

export const xssInjectionAttempt = () => ({
    userId: 'user-123',
    type: '<script>alert("xss")</script>',
    videoTime: 10,
    timestamp: new Date().toISOString(),
});

export const invalidSymbolsEvent = () => ({
    userId: 'user-123',
    type: '@#$%^&*()!',
    videoTime: 15,
    timestamp: new Date().toISOString(),
});

export const nonStringUserIdEvent = () => ({
    userId: 12345, // should be string
    type: 'play',
    videoTime: 12,
    timestamp: new Date().toISOString(),
});

export const missingTypeEvent = () => ({
    userId: 'user-123',
    videoTime: 10,
    timestamp: new Date().toISOString(),
});

export const nullValuesEvent = () => ({
    userId: null,
    type: null,
    videoTime: null,
    timestamp: null,
});

export const internationalCharsEvent = () => ({
    userId: '用户-123',
    type: 'play',
    videoTime: 10,
    timestamp: new Date().toISOString(),
});

export const emptyStringsEvent = () => ({
    userId: '',
    type: '',
    videoTime: 0,
    timestamp: '',
});

export const whitespaceStringsEvent = () => ({
    userId: '   ',
    type: '  ',
    videoTime: 10,
    timestamp: new Date().toISOString(),
});

export const negativeCases = [
    { name: 'missing videoTime', data: missingVideoTimeEvent },
    { name: 'missing userId', data: missingUserIdEvent },
    { name: 'wrong type', data: wrongTypeEvent },
    { name: 'empty payload', data: emptyPayload },
    { name: 'invalid timestamp format', data: invalidTimestampFormatEvent },
    { name: 'negative videoTime', data: negativeVideoTimeEvent },
    { name: 'extra unexpected field', data: extraUnexpectedFieldEvent },
    { name: 'SQL injection attempt', data: sqlInjectionAttempt },
    { name: 'XSS injection attempt', data: xssInjectionAttempt },
    { name: 'invalid symbols in type', data: invalidSymbolsEvent },
    { name: 'non-string userId', data: nonStringUserIdEvent },
    { name: 'missing type field', data: missingTypeEvent },
    { name: 'null values for all fields', data: nullValuesEvent },
    { name: 'international characters in userId', data: internationalCharsEvent },
    { name: 'empty strings in userId and type', data: emptyStringsEvent },
    { name: 'whitespace strings in userId and type', data: whitespaceStringsEvent },
];
