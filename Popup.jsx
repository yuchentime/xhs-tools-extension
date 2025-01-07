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

  const startScrapeComments = () => {
    chrome.storage.local.set({ isCollecting: true });
    setRunning(true);
    chrome.runtime.sendMessage({ action: 'start' });
  };

  const stopScrapeComments = () => {
    chrome.storage.local.set({ isCollecting: false });
    setRunning(false);
    chrome.runtime.sendMessage({ action: 'stop' });
  };

  return (
    <div className="popup-container">
      <div className="popup-header">
        <h1>小红书工具</h1>
        <p className="subtitle">评论采集助手</p>
      </div>

      <div className="control-panel">
        <div className="control-item">
          <span className="control-label">评论采集</span>
          <div className="control-actions">
            {running ? (
              <button
                className="control-button stop"
                onClick={stopScrapeComments}
              >
                <StopIcon width={20} height={20} />
                <span>停止</span>
              </button>
            ) : (
              <button
                className="control-button start"
                onClick={startScrapeComments}
              >
                <PlayIcon width={20} height={20} />
                <span>开始</span>
              </button>
            )}
          </div>
        </div>

        {/* <button className="export-button" onClick={exportComments}>
          导出数据
        </button> */}
      </div>

      {running && (
        <div className="status-bar">
          <div className="status-indicator"></div>
          <span>正在采集中...</span>
        </div>
      )}
    </div>
  );
};

export default Popup;
