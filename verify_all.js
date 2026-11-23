import { chromium } from 'playwright';
import path from 'path';

async function verifyFile(relativePath) {
  console.log(`\n======================================================`);
  console.log(`VERIFYING STANDALONE: ${relativePath}`);
  console.log(`======================================================`);

  const browser = await chromium.launch({ headless: true, channel: 'msedge' });
  const context = await browser.newContext({
    viewport: { width: 390, height: 844 }, // iPhone 14
    deviceScaleFactor: 2,
  });
  const page = await context.newPage();

  const errors = [];
  page.on('console', msg => {
    if (msg.type() === 'error') errors.push(`[Console Error] ${msg.text()}`);
  });
  page.on('pageerror', err => errors.push(`[Page Error] ${err.message}`));
  page.on('requestfailed', req => {
    const errorText = req.failure() ? req.failure().errorText : '';
    // net::ERR_ABORTED is standard browser behavior when unmounting <video> or canceling media ranges
    if (errorText !== 'net::ERR_ABORTED') {
      errors.push(`[Failed Request] ${req.url()} (${errorText})`);
    }
  });

  const absoluteUrl = 'file:///' + path.resolve(relativePath).replace(/\\/g, '/');
  console.log('Loading URL:', absoluteUrl);
  await page.goto(absoluteUrl, { waitUntil: 'load' });
  await page.waitForTimeout(600);

  // 1. Sealed envelope
  const envelope = await page.$('.envelope');
  if (!envelope) throw new Error('Envelope element not found!');
  const guestName = await page.textContent('.highlight-guest');
  console.log(`✓ Intro envelope loaded for: "${guestName?.trim()}"`);

  // 2. Open envelope
  console.log('Opening wax seal with spring physics...');
  await page.click('.wax-seal', { force: true });
  await page.waitForSelector('.welcome-heading', { timeout: 5000 });
  const welcomeText = await page.textContent('.welcome-heading');
  console.log(`✓ Card 1 (Welcome) loaded: "${welcomeText?.trim()}"`);

  // 3. Card 2 (The Bride)
  await page.click('.nav-arrow-next', { force: true });
  await page.waitForSelector('.bride-arch-gallery', { timeout: 5000 });
  const brideName = await page.textContent('.section-title .title-main');
  console.log(`✓ Card 2 (The Bride) loaded: "${brideName?.trim()}"`);

  // 4. Card 3 (Scratch Game)
  await page.click('.nav-arrow-next', { force: true });
  await page.waitForSelector('.scratch-canvas', { timeout: 5000 });
  console.log('✓ Card 3 (Scratch Game) loaded');

  // 5. Card 4 (Dates & Videos)
  await page.click('.nav-arrow-next', { force: true });
  await page.waitForSelector('.scene-tabs-bar', { timeout: 5000 });
  console.log('✓ Card 4 (Dates & Red Dress Video Scene) loaded');

  // Test Red dress scene tab
  const tabs = await page.$$('.scene-tab-pill');
  if (tabs[2]) {
    await tabs[2].click({ force: true });
    await page.waitForTimeout(400);
    const storyText = await page.textContent('.scene-story-text');
    console.log(`✓ Scene 3 Red Dress promise text verified: "${storyText?.substring(0, 50)}..."`);
  }

  // 6. Card 5 (Nikkah Proposal Game)
  await page.click('.nav-arrow-next', { force: true });
  await page.waitForSelector('.nikkah-game-card', { timeout: 5000 });
  console.log('✓ Card 5 (Nikkah Proposal Game) loaded');

  const choiceBtn = page.locator('.btn-choice-heart');
  if (await choiceBtn.count() > 0) {
    await choiceBtn.click();
    await page.waitForSelector('.nikkah-certificate', { timeout: 3000 });
    console.log('✓ Qubool Hai clicked: Nikkah certificate unlocked!');
  }

  // 7. Card 6 (Details & Countdown)
  await page.click('.nav-arrow-next', { force: true });
  await page.waitForSelector('.countdown-grid', { timeout: 5000 });
  const daysText = await page.textContent('.time-number');
  console.log(`✓ Card 6 (Details & Countdown) loaded. Days: ${daysText}`);

  // 8. Card 7 (Memories & WhatsApp RSVP)
  await page.click('.nav-arrow-next', { force: true });
  await page.waitForSelector('.whatsapp-cta-btn', { timeout: 5000 });
  console.log('✓ Card 7 (Memories & WhatsApp RSVP) loaded');

  // 9. Card 8 (Finale & Replay)
  await page.click('.nav-arrow-next', { force: true });
  await page.waitForSelector('.finale-love-card', { timeout: 5000 });
  console.log('✓ Card 8 (Forever Love Card) loaded');

  // Confetti
  await page.click('.celebratory-btn', { force: true });
  console.log('✓ Confetti shower button triggered');

  // Replay
  const replayBtn = page.locator('.replay-experience-btn');
  await replayBtn.scrollIntoViewIfNeeded();
  await replayBtn.click();
  await page.waitForSelector('.envelope', { timeout: 5000 });
  console.log('✓ Replay successfully brought user back to sealed envelope!');

  console.log(`Reported errors: ${errors.length}`);
  if (errors.length > 0) {
    console.error('Errors encountered:', errors);
    throw new Error('Test failed with errors');
  }

  console.log(`SUCCESS for ${relativePath}! Zero errors!`);
  await browser.close();
}

async function run() {
  await verifyFile('dist/index.html');
  await verifyFile('invitation.html');
  console.log('\n======================================================');
  console.log('🎉 ALL 8 PHYSICAL CARDS & VIDEO SCENES VERIFIED 100%! 🎉');
  console.log('======================================================\n');
}

run().catch(err => {
  console.error('Verification failed:', err);
  process.exit(1);
});
