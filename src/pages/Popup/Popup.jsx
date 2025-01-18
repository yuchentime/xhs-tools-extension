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

  const translate = async () => {
    setRunning(true);
    const tab = await getCurrentTab();
    chrome.tabs.sendMessage(tab.id, { action: 'translate' }).then(() => {
      setRunning(false);
    });
  };

  const stop = async () => {
    setRunning(false);
    const tab = await getCurrentTab();
    chrome.tabs.sendMessage(tab.id, { action: 'stop' });
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
        <span>Translate</span>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '5px',
          }}
        >
          {running ? (
            <StopIcon width={20} height={20} fill="red" onClick={translate} />
          ) : (
            <PlayIcon width={20} height={20} fill="green" onClick={stop} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Popup;
