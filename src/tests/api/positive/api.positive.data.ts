    export const validPlayEvent = () => ({
        userId: 'user-123',
        type: 'play',
        videoTime: 0,
        timestamp: new Date().toISOString(),
    });

    export const validPauseEvent = () => ({
        userId: 'user-456',
        type: 'pause',
        videoTime: 10.5,
        timestamp: new Date().toISOString(),
    });

    export const validSeekedEvent = () => ({
        userId: 'user-789',
        type: 'seeked',
        videoTime: 34.2,
        timestamp: new Date().toISOString(),
    });

    export const validScrollEvent = () => ({
        userId: 'user-101',
        type: 'scroll',
        videoTime: 0,
        timestamp: new Date().toISOString(),
    });


    export const playNearEndEvent = () => ({
        userId: 'user-999',
        type: 'play',
        videoTime: 59.9, // Assume video is ~60s long
        timestamp: new Date().toISOString(),
    });

    export const pauseImmediatelyEvent = () => ({
        userId: 'user-000',
        type: 'pause',
        videoTime: 0,
        timestamp: new Date().toISOString(),
    });

    export const seekToStartEvent = () => ({
        userId: 'user-888',
        type: 'seeked',
        videoTime: 0,
        timestamp: new Date().toISOString(),
    });

    export const scrollAtMidEvent = () => ({
        userId: 'user-777',
        type: 'scroll',
        videoTime: 30.0,
        timestamp: new Date().toISOString(),
    });

    export const rapidSeekEvent = () => ({
        userId: 'user-rapid',
        type: 'seeked',
        videoTime: 58.2,
        timestamp: new Date().toISOString(),
    });

    export const eventFromEdgeUser = () => ({
        userId: 'user-edge-case',
        type: 'pause',
        videoTime: 0.01,
        timestamp: new Date().toISOString(),
    });

    // Combine all into array for parameterized testing
    export const positiveCases = [
        { name: 'play event', data: validPlayEvent },
        { name: 'pause event', data: validPauseEvent },
        { name: 'seeked event', data: validSeekedEvent },
        { name: 'scroll event', data: validScrollEvent },
        { name: 'play near end', data: playNearEndEvent },
        { name: 'pause at start', data: pauseImmediatelyEvent },
        { name: 'seek to start', data: seekToStartEvent },
        { name: 'scroll at mid video', data: scrollAtMidEvent },
        { name: 'rapid seek near end', data: rapidSeekEvent },
        { name: 'pause from edge user', data: eventFromEdgeUser },
    ];
