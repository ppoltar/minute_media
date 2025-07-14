.PHONY: build test clean install allure

up_server:
	cd player_files && docker-compose up -d --build

down_server:
	cd player_files && docker-compose down

build:
	DOCKER_DEFAULT_PLATFORM=linux/amd64 docker build -t my-playwright-tests .

test:
	docker run --rm \
		-v $(PWD)/playwright-report:/app/playwright-report \
		-v $(PWD)/test-results:/app/test-results \
		-e IS_DOCKER=true \
		my-playwright-tests \
		npx playwright test  --output=test-results

clean:
	rm -rf playwright-report
	rm -rf test-results

install: up_server build test
