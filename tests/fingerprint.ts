import { FingerprintManager } from '@src/fingerprint/manager';
import { resolveFromRoot, waitForKeypress } from '../src/helpers';
import { Chromium } from '../src';

export async function runFingerprintTest(): Promise<void> {
  const manager = new FingerprintManager();
  const fingerprint = await manager.new({
    tags: ['Android', 'Chrome'],
  });
  const saveFingerprintPath = resolveFromRoot('data/browser/fingerprint/default.json');
  manager.save(saveFingerprintPath);
  const profileDirPath = resolveFromRoot("data/browser/profile/default");

  const browser = Chromium.useFingerprint(fingerprint).useProfile(profileDirPath).launch();
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto('https://www.google.com');
  await waitForKeypress();
  await browser.quit(profileDirPath);
  console.log("Hoan thanh test")
}
await runFingerprintTest();
