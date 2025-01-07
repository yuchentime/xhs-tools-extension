import { Bars3Icon, PlayIcon } from '@heroicons/react/24/outline';
import React from 'react';
import './Popup.css';

const Popup = () => {
  const startScrapeComments = async () => {
    const tab = await getCurrentTab();
    chrome.tabs.sendMessage(tab.id, { action: 'startXhsComments' });
  };

  const stopScrapeComments = async () => {
    const tab = await getCurrentTab();
    chrome.tabs.sendMessage(tab.id, { action: 'stopXhsComments' });
  };

  const getCurrentTab = async () => {
    return new Promise((resolve, reject) => {
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        if (chrome.runtime.lastError) {
          reject(chrome.runtime.lastError);
        } else {
          resolve(tabs[0]);
        }
      });
    });
  };

  return (
    <div className="App">
      <div style={{}}>
        <div
          style={{
            backgroundColor: '#1890ff',
            color: '#fff',
            border: 'none',
            padding: '5px',
            borderRadius: '5px',
            cursor: 'pointer',
            fontSize: '16px',
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          <span>采集评论</span>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '5px',
            }}
          >
            <PlayIcon
              width={20}
              height={20}
              fill="#fff"
              onClick={startScrapeComments}
            />
            <Bars3Icon
              width={20}
              height={20}
              fill="#fff"
              onClick={stopScrapeComments}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Popup;
