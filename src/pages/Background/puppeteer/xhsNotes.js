import {
  connect,
  ExtensionTransport,
} from 'puppeteer-core/lib/esm/puppeteer/puppeteer-core-browser.js';

export const testPuppeteer = async (url) => {
  // Create a tab or find a tab to attach to.
  const windows = await chrome.windows.create({
    url,
    width: 800,
    height: 800,
  });
  const tab = windows.tabs?.[0];
  // Connect Puppeteer using the ExtensionTransport.connectTab.
  const browser = await connect({
    transport: await ExtensionTransport.connectTab(tab.id),
  });
  // You will have a single page on the browser object, which corresponds
  // to the tab you connected the transport to.
  const [page] = await browser.pages();

  // 拦截不必要的资源加载（样式文件不能拦截）
  await page.setRequestInterception(true);
  page.on('request', (req) => {
    if (['image', 'Media', 'Font'].includes(req.resourceType())) {
      req.abort();
    } else {
      req.continue();
    }
  });

  // Perform the usual operations with Puppeteer page.
  await page.waitForSelector('.note-text');
  const noteText = await page.$eval(
    '.note-text',
    (noteText) => noteText.textContent
  );
  console.log('标题：', noteText);

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
