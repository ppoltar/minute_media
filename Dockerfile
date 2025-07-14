FROM mcr.microsoft.com/playwright:focal

ENV DOCKER=true

# Install Google Chrome (for x86_64 only)
RUN apt-get update && \
    apt-get install -y wget gnupg ca-certificates curl && \
    curl -fsSL https://dl.google.com/linux/linux_signing_key.pub | gpg --dearmor -o /usr/share/keyrings/google-linux.gpg && \
    echo "deb [arch=amd64 signed-by=/usr/share/keyrings/google-linux.gpg] http://dl.google.com/linux/chrome/deb/ stable main" > /etc/apt/sources.list.d/google-chrome.list && \
    apt-get update && \
    apt-get install -y --no-install-recommends google-chrome-stable && \
    apt-get clean && rm -rf /var/lib/apt/lists/*

# Set working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json (or yarn.lock)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the entire project into the container
COPY . .

# (Optional) Install Playwright browsers (usually included in base image)
RUN npx playwright install --with-deps

# Default command to run all tests (no filter)
CMD ["npx", "playwright", "test", "--output", "test-results"]
