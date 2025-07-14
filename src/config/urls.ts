const isDocker = process.env.IS_DOCKER === 'true';

const BASE_URL = isDocker
    ? 'http://web:3000' // Access host from inside Docker
    : 'http://localhost:3000';          // Local testing

export const BASE_URLS = {
    main_page: `${BASE_URL}`,
    api_event: `${BASE_URL}/api/event`,

};