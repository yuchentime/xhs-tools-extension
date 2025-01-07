import { printLine } from './modules/print';
import { collectComments } from './modules/xhsComments';

console.log('Content script works!');
console.log('Must reload extension for modifications to take effect.');

printLine("Using the 'printLine' function from the Print Module");

let executeStatus = "running"

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log('Message received from background script:', message);
  if (message.action === 'startXhsComments') {
    console.log('xhsComments action received!');
    chrome.runtime.sendMessage({ action: 'process' });

    collectComments(executeStatus)
      .then(() => {
        chrome.runtime.sendMessage({ action: 'reset' });
        sendResponse('Message received!');
      })
      .catch((error) => {
        console.error('Error collecting comments:', error);
        chrome.runtime.sendMessage({ action: 'reset' });
        sendResponse('Error collecting comments!');
      });
  } else if (message.action === 'stopXhsComments') {
    console.log('stopXhsComments action received!');
    executeStatus = "stopped"
    chrome.runtime.sendMessage({ action: 'reset' });
  } else {
    sendResponse('Unknown action!');
  }
  return true;
});
