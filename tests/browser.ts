import { waitForKeypress } from '@src/helpers';
import { Chromium } from '@src/adapter/playwright/chromium';

export const DRIVEN_TEST_SITES = ['https://abrahamjuliot.github.io/creepjs/', 'https://fingerprint.com/'];

/**
 * Khởi chạy trình duyệt Chromium, điều hướng đến các trang test và chờ input bàn phím.
 */
export async function runChromiumTest(): Promise<void> {
  let browser

  try {
    browser = Chromium.launch();
    const context = await browser.newContext();

    // Mở tuần tự từng trang để tránh overload server
    for (const url of DRIVEN_TEST_SITES) {
      const page = await context.newPage();
      await page.goto(url, { waitUntil: 'domcontentloaded' });
      console.log(`[Chromium] Đã mở thành công: ${url}`);
    }

    await waitForKeypress();
  } catch (error) {
    console.error('Lỗi khi chạy test Chromium:', error);
  } finally {
    if (browser) {
      await browser.quit();
      console.log('Đã đóng trình duyệt Chromium.');
    }
  }
}

await runChromiumTest();
