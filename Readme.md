# 📄 Minute Media Video Player Test Plan

## 📘 Project Overview

**Project Name:** MyPlayer Web Client
**Owner:** Automation Infrastructure Lead - Pasha
**Scope:** Frontend HTML5 video player with backend event tracking (play, pause, seek, scroll)

---

## ✅ Purpose

Ensure high confidence in the **video player functionality**, **event tracking API**, and **user experience** through complete test automation, robust validation, and clear reporting.

---

## 🧪 Functional Test Coverage

### 🎥 UI Test Cases (Automated via Playwright)

| Feature      | Test Case Description                       | Tags                |
|--------------| ------------------------------------------- | ------------------- |
| Availability | Main page loads successfully                | `@ui @availability` |
| Play         | Play button triggers playback & sends event | `@ui @play`         |
| Pause        | Pause button halts video & sends event      | `@ui @pause`        |
| Seek         | Seek video and validate time + event        | `@ui @seek`         |
| Scroll       | Scroll page triggers scroll event           | `@ui @scroll`       |
| E2E Flow     | Full flow: play → seek → pause → scroll     | `@ui @e2e`          |

### 🔗 API Test Cases


#### ✅ Positive (Valid JSON payloads)

| **Case**                | **Description**                                              |
|-------------------------|--------------------------------------------------------------|
| Valid Play              | Event with `type: "play"` and `videoTime: 0`                 |
| Valid Pause             | Event with `type: "pause"` and `videoTime: 8.5`              |
| Valid Seeked            | Event with `type: "seeked"` and `videoTime: 7.2`             |
| Valid Scroll            | Scroll event with `videoTime: 0`                             |
| Play Near End           | `videoTime: 9.9` - simulates playback near video end         |
| Pause Immediately       | Pause at `videoTime: 0`                                      |
| Seek to Start           | Seek to `videoTime: 0`                                       |
| Scroll at Mid Video     | Scroll event with `videoTime: 3.0`                           |
| Rapid Seek Near End     | Seek event at `videoTime: 2.2`                               |
| Pause from Edge User    | Very short time and custom `userId: "user-edge-case"`        |

#### ❌ Negative (Invalid or Malformed Payloads)

| **Case**                      | **Description**                                             |
|------------------------------|-------------------------------------------------------------|
| Missing `videoTime`          | Payload omits `videoTime` field                             |
| Missing `userId`             | Payload omits `userId` field                                |
| Missing `type`               | Payload omits `type` field                                  |
| Empty Payload                | `{}` as input                                               |
| Wrong Type (Number)          | `type: 123` instead of string                               |
| Invalid Timestamp Format     | `timestamp: "not-a-valid-timestamp"`                        |
| Negative Video Time          | `videoTime: -5` (invalid)                                   |
| Extra Unexpected Field       | Includes non-schema field like `extraField`                |
| SQL Injection Attempt        | `type: "play'; DROP TABLE users; --"`                       |
| XSS Injection Attempt        | `type: '<script>alert("xss")</script>'`                     |
| Invalid Symbols in Type      | `type: "@#$%^&*()!"`                                        |
| Non-String userId            | `userId: 12345` instead of string                           |
| Null Values for All Fields   | All fields set to `null`                                    |
| Empty Strings                | Empty strings in `userId`, `type`, and `timestamp`          |
| Whitespace Strings           | Fields filled with only spaces (e.g. `'   '`)               |
| International Characters     | Unicode `userId` (e.g. `'用户-123'`)                         |

---

## ⚙️ Manual vs Automated

| Type                  | Approach          | Coverage                       |
|-----------------------| ----------------- | ------------------------------ |
| UI Availability Tests | Manual + Auto     | First load, layout/UX sanity   |
| Functional Flows      | Automated         | Play, pause, seek, scroll      |
| API (Positive)        | Automated         | Valid event payloads           |
| API (Negative)        | Automated         | Invalid, malformed payloads    |
---

## 🛠️ Tools & Frameworks

| Tool                           | Reason                                                        |
|--------------------------------|---------------------------------------------------------------|
| **Playwright**                 | Fast, modern UI automation with great parallelism & reporting |
| **TypeScript**                 | Type safety and structure for scaling automation code         |
| **HTML/XML Report** (optional) | For CI-based HTML reports with screenshots, logs...           |
| **GitHub Actions**             | CI pipeline support for automation runs and pull requests     |
| **Make**                       | Simplifies common tasks like build, test, clean, report       |
| **Docker**                     | Ensures consistent, containerized test environments           |

## 🧪 Automation Structure

```
├── src
│   ├── tests
│   │   ├── availability
│   │   │   ├── availability.spec.ts
│   │   ├── ui
│   │   │   ├── video-player.playback.spec.ts
│   │   │   ├── video-player.scroll.spec.ts
│   │   │   ├── video-player.scroll.spec.ts
│   │   │   └── video-player.e2e.spec.ts
│   │   ├── api
│   │   │   ├── positive
│   │   │   │   ├── api.positive.spec.ts
│   │   │   │   ├── api.positive.data.ts
│   │   │   ├── negative
│   │   │   │   ├── api.negative.spec.ts
│   │   │   │   ├── api.negative.data.ts
│   └── fixtures/video-player.fixture.ts
│   └──pages/video-player.page.ts
│   └──config/urls.ts
│   └──locators/video-player.locators.ts
├── .github/workflows/ci.yml
├── player_files/
```

---

## 🚀 CI Pipeline

**Tool:** GitHub Actions

#### 🛠️ Steps:

1. Checkout code
2. Install dependencies
3. Start backend server
4. Build test image
5. Run tests
6. Export test results
7. Upload test report artifact
8. Fail CI if tests failed (based on exit code)

---

### **Tool:** Report summary in PR

#### 💬 Steps:
Post PR comment with test summary

---

### **Tool:** GitHub Pages 

#### 📘 Steps:
Deploy a tests report to GitHub Pages 
with a link to report.

---

### **Tool:** ESLint & Prettier 

#### 🧹 Steps:

1. Run ESLint
2. Run Prettier check
---

## 📊 Reporting

**Format:** Playwright HTML report
Automatically generates a test report with:
1. 	Test name
2.	Steps performed
3.	Status (pass/fail)
4.	Logs and errors
5.	Screenshots/Video/Trace for fails
---
