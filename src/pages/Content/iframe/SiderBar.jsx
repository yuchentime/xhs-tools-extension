import React, { useState } from 'react';
// import Navbar from './Navbar';

const Sidebar = () => {
  const [activeTab, setActiveTab] = useState('home');

  return (
    <>
      {/* 顶部菜单栏 */}
      <div style={{ height: '64px', borderBottom: '1px solid #e5e7eb' }}>
        {/* <Navbar activeTab={activeTab} setActiveTab={setActiveTab} /> */}
      </div>

      {/* 展示区域 */}
      <div style={{ display: activeTab === 'home' ? 'block' : 'none' }}>
        
      </div>
    </>
  );
};

export default Sidebar;
