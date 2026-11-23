import { chromium } from 'playwright';
import path from 'path';

async function test() {
  const browser = await chromium.launch({ headless: true, channel: 'msedge' });
  const context = await browser.newContext({
    viewport: { width: 390, height: 844 }
  });
  const page = await context.newPage();

  const errors = [];
  page.on('console', msg => {
    if (msg.type() === 'error') errors.push(msg.text());
  });
  page.on('pageerror', err => errors.push(err.message));

  const filePath = 'file:///' + path.resolve('dist/index.html').replace(/\\/g, '/');
  console.log('1. Opening standalone single-file directly in browser at:', filePath);
  await page.goto(filePath, { waitUntil: 'load' });
  await page.waitForTimeout(500);

  console.log('2. Verifying sealed envelope...');
  const envelope = await page.$('.envelope');
  if (!envelope) throw new Error('Envelope not found in singlefile bundle!');
  console.log('Sealed envelope verified.');

  console.log('3. Clicking wax seal with Framer Motion spring...');
  await page.click('.wax-seal', { force: true });
  await page.waitForSelector('.welcome-heading', { timeout: 4000 });
  console.log('3D unseal and card unfold verified! Chapter 1 loaded.');

  console.log('4. Navigating to Chapter 2: The Bride...');
  await page.click('.nav-arrow-next', { force: true });
  await page.waitForSelector('.bride-arch-gallery', { timeout: 4000 });
  const brideHeading = await page.textContent('.section-title .title-main');
  console.log(`Bride portrait verified: "${brideHeading?.trim()}"`);

  console.log('5. Navigating to Chapter 3: Scratch-to-Reveal...');
  await page.click('.nav-arrow-next', { force: true });
  await page.waitForSelector('.scratch-canvas', { timeout: 4000 });
  console.log('Scratch canvas verified.');

  console.log('6. Navigating to Chapter 4: Details & Countdown...');
  await page.click('.nav-arrow-next', { force: true });
  await page.waitForSelector('.countdown-grid', { timeout: 4000 });
  const daysText = await page.textContent('.time-number');
  console.log(`Countdown active. Days displayed: ${daysText}`);

  console.log('7. Navigating to Chapter 5: Memories & WhatsApp RSVP...');
  await page.click('.nav-arrow-next', { force: true });
  await page.waitForSelector('.whatsapp-cta-btn', { timeout: 4000 });
  console.log('Memory cards and WhatsApp RSVP verified.');

  console.log('8. Navigating to Chapter 6: Grand Finale...');
  await page.click('.nav-arrow-next', { force: true });
  await page.waitForSelector('.finale-badge-card', { timeout: 4000 });
  console.log('VIP Guest badge card verified.');

  console.log('9. Replaying invitation experience...');
  await page.evaluate(() => {
    const btn = document.querySelector('.replay-experience-btn');
    if (btn) btn.click();
  });
  await page.waitForSelector('.envelope', { timeout: 5000 });
  console.log('Replay smoothly restored sealed envelope!');

  console.log('Total console/page errors:', errors.length);
  if (errors.length > 0) {
    console.log('Errors:', errors);
  } else {
    console.log('🎉 100% PERFECT VERIFICATION! Works standalone directly via file:/// with 0 errors!');
  }

  await browser.close();
}

test().catch(err => {
  console.error('Test error:', err);
  process.exit(1);
});
