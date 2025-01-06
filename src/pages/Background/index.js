console.log('This is the background page.');
console.log('Put the background scripts here.');

chrome.action.onClicked.addListener(() => {
    console.log('Action button clicked!');
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      console.log('Sending message to content script...');
      chrome.tabs.sendMessage(tabs[0].id, { action: 'toggle' });
    });
  });
  