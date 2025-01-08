import { testPuppeteer } from './puppeteer/xhsNotes';

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
