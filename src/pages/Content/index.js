import { printLine } from './modules/print';
import { collectComments } from './modules/xhsComments';

console.log('Content script works!');
console.log('Must reload extension for modifications to take effect.');

printLine("Using the 'printLine' function from the Print Module");

const IFRAME_ID = 'xhs-id-iframe';
const IFRAME_CLASS = 'xhs-flow-iframe';
const ANIMATION_CLASS = {
  IN: 'iframe-animation-in',
  OUT: 'iframe-animation-out',
};
const iframeSrc = chrome.runtime.getURL('iframe.html');

class IframeManager {
  static instance = null;

  static getInstance() {
    if (!this.instance) {
      const parser = new DOMParser();
      this.instance = parser.parseFromString(
        `<iframe id="${IFRAME_ID}" class="${IFRAME_CLASS}" src="${iframeSrc}"></iframe>`,
        'text/html'
      ).body.firstElementChild;
    }
    return this.instance;
  }
}

function toggleIframe(iframe) {
  if (!iframe || !document.body) return;

  requestAnimationFrame(() => {
    const isVisible = document.body.contains(iframe);

    if (isVisible) {
      iframe.classList.add(ANIMATION_CLASS.OUT);
      iframe.classList.remove(ANIMATION_CLASS.IN);
      document.body.removeChild(iframe);
    } else {
      iframe.classList.remove(ANIMATION_CLASS.OUT);
      iframe.classList.add(ANIMATION_CLASS.IN);
      document.body.appendChild(iframe);
    }
  });
}

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log('Message received from background script:', message);
  if (message.action === 'toggle') {
    console.log('Toggle action received!');
    toggleIframe(IframeManager.getInstance());
    sendResponse('Message received!');
  } else if (message.action === 'xhsComments') {
    console.log('xhsComments action received!');
    collectComments().then(() => {
      sendResponse('Message received!');
    });
  } else {
    sendResponse('Unknown action!');
  }
  return true;
});
