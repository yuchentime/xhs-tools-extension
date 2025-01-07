import { printLine } from './modules/print';
import { collectComments, stopCollecting } from './modules/xhsComments';

console.log('Content script works!');
console.log('Must reload extension for modifications to take effect.');

printLine("Using the 'printLine' function from the Print Module");

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log('Message received from background script:', message);
  if (message.action === 'startXhsComments') {
    console.log('xhsComments action received!');
    chrome.runtime.sendMessage({ action: 'process' });
    collectComments()
      .then(() => {
        chrome.runtime.sendMessage({ action: 'reset' });
        sendResponse({status: 'ok'});
      })
      .catch((error) => {
        console.error('Error collecting comments:', error);
        stopCollecting();
        sendResponse({status: 'error', error: error.message});
      });
  } else if (message.action === 'stopXhsComments') {
    console.log('stopXhsComments action received!');
    stopCollecting();
    sendResponse({status: 'ok'});
  } else if (message.action === 'exportCsv') {
    console.log('exportCsv action received!');
    sendResponse({status: 'ok'});
  } else {
    sendResponse({status: 'error', error: 'Unknown action'});
  }
  return true;
});
