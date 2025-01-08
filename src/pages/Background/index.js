import {
  connect,
  ExtensionTransport,
} from 'puppeteer-core/lib/esm/puppeteer/puppeteer-core-browser.js';

console.log('This is the background page.');
console.log('Put the background scripts here.');

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'start') {
    const tabId = sender.tab.id;
    chrome.action.setBadgeText({ tabId, text: '1' });
    chrome.action.setBadgeTextColor({ tabId, color: 'white' });
    chrome.action.setBadgeBackgroundColor({ tabId, color: 'blue' });
    sendResponse(true);
  } else if (message.action === 'stop') {
    const tabId = sender.tab.id;
    chrome.action.setBadgeText({ tabId, text: '' });
    sendResponse(true);
  } else if (message.action === 'testPuppeteer') {
    testPuppeteer(message.url).then(() => {
      sendResponse({ status: 'ok' });
    });
  }
  return true;
});

const testPuppeteer = async (url) => {
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
  browser.disconnect();
};
