import {
  connect,
  ExtensionTransport,
} from 'puppeteer-core/lib/esm/puppeteer/puppeteer-core-browser.js';

export const testPuppeteer = async (url) => {
  // Create a tab or find a tab to attach to.
  const tab = await chrome.tabs.create({
    url,
  });
  // Connect Puppeteer using the ExtensionTransport.connectTab.
  const browser = await connect({
    transport: await ExtensionTransport.connectTab(tab.id),
  });
  // You will have a single page on the browser object, which corresponds
  // to the tab you connected the transport to.
  const [page] = await browser.pages();
  // Perform the usual operations with Puppeteer page.
  await page.waitForSelector('.note-text');
  const bodyHandle = await page.$('.note-text');
  const html = await page.evaluate((body) => body.textContent, bodyHandle);
  console.log('标题：', html);

  await page.click('.show-more');
  const replyContainer = await page.$('.list-container');
  const subCommentItems = await replyContainer.$$('.comment-item-sub');
  const results = await Promise.all(
    subCommentItems.map(async (node) => {
      return await page.evaluate((el) => el.textContent, node);
    })
  );
  console.log('回复内容：', results);
  browser.disconnect();
  
  chrome.tabs.remove(tab.id);
};
