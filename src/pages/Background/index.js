console.log('This is the background page.');
console.log('Put the background scripts here.');

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'process') {
    chrome.action.setBadgeText({ text: 1 });
  } else if (message.action === 'reset') {
    chrome.action.setBadgeText({ text: '' });
  }
  sendResponse({ success: true });
});
