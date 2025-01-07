import { PlayIcon, StopIcon } from '@heroicons/react/24/outline';
import React, { useEffect, useState } from 'react';
import './Popup.css';

const Popup = () => {
  const [running, setRunning] = useState(false);

  useEffect(() => {
    chrome.storage.local.get(['isCollecting'], (result) => {
      setRunning(result.isCollecting);
    });
  }, []);

  const startScrapeComments = async () => {
    const tab = await getCurrentTab();
    chrome.tabs.sendMessage(tab.id, { action: 'startXhsComments' });
    setRunning(true);
  };

  const stopScrapeComments = async () => {
    const tab = await getCurrentTab();
    chrome.tabs.sendMessage(tab.id, { action: 'stopXhsComments' });
    setRunning(false);
  };

  const exportComments = async () => {
    const tab = await getCurrentTab();
    chrome.tabs.sendMessage(tab.id, { action: 'exportXhsComments' });
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
            backgroundColor: 'white',
            color: 'black',
            border: 'none',
            padding: '5px',
            borderRadius: '5px',
            cursor: 'pointer',
            fontSize: '16px',
            display: 'flex',
            justifyContent: 'space-between',
            height: '40px',
            alignItems: 'center',
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
            {running ? (
              <StopIcon
                width={20}
                height={20}
                fill="red"
                onClick={stopScrapeComments}
              />
            ) : (
              <PlayIcon
                width={20}
                height={20}
                fill="green"
                onClick={startScrapeComments}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Popup;
