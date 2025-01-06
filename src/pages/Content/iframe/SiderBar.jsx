import React, { useState } from 'react';
// import Navbar from './Navbar';

const Sidebar = () => {
  const [activeTab, setActiveTab] = useState('home');
  const handleCollectComments = async() => {
    const tab = await getCurrentTab();
    chrome.tabs.sendMessage(tab.id, { action: 'xhsComments' });
  }

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
  }

  return (
    <>
      {/* 顶部菜单栏 */}
      <div style={{ height: '64px', borderBottom: '1px solid #e5e7eb' }}>
        {/* <Navbar activeTab={activeTab} setActiveTab={setActiveTab} /> */}
      </div>

      {/* 展示区域 */}
      <div style={{ display: activeTab === 'home' ? 'block' : 'none' }}>
        <button onClick={handleCollectComments} style={{
          backgroundColor: '#1890ff',
          color: '#fff',
          border: 'none',
          padding: '10px 20px',
          borderRadius: '5px',
          cursor: 'pointer',
          fontSize: '16px',
        }}>采集评论</button>
      </div>
    </>
  );
};

export default Sidebar;
