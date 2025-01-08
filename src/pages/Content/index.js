import { printLine } from './modules/print';
import { collectComments, stopCollecting } from './modules/xhsComments';
import { exportCommentsToCSV } from './modules/csv';

console.log('Content script works!');
console.log('Must reload extension for modifications to take effect.');

printLine("Using the 'printLine' function from the Print Module");

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log('Message received from background script:', message);
  if (message.action === 'startXhsComments') {
    console.log('xhsComments action received!');
    chrome.runtime.sendMessage({action: 'start'});
    collectComments()
      .then((comments) => {
        chrome.runtime.sendMessage({action: 'stop'});
        // 导出csv
        exportCommentsToCSV(comments);
        sendResponse({status: 'ok'});
      })
      .catch((error) => {
        chrome.runtime.sendMessage({action: 'stop'});
        console.error('Error collecting comments:', error);
        stopCollecting();
        sendResponse({status: 'error', error: error.message});
      });
  } else if (message.action === 'stopXhsComments') {
    console.log('stopXhsComments action received!');
    stopCollecting();
    chrome.runtime.sendMessage({action: 'stop'});
    sendResponse({status: 'ok'});
  } else if (message.action === 'exportCsv') {
    console.log('exportCsv action received!');
    sendResponse({status: 'ok'});
  } else {
    sendResponse({status: 'error', error: 'Unknown action'});
  }
  return true;
});
