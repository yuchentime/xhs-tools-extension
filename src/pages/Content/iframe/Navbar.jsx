import { HomeIcon } from '@heroicons/react/24/outline';
import React from 'react';

const Navbar = ({ activeTab, setActiveTab }) => {
  return (
    <nav
      style={{
        display: 'flex',
        height: '100%',
        alignItems: 'center',
        paddingLeft: '1rem',
        paddingRight: '1rem',
      }}
    >
      <button
        onClick={() => setActiveTab('home')}
        style={{
          display: 'flex',
          alignItems: 'center',
          padding: '0.5rem 1rem',
          borderRadius: '0.5rem',
          marginRight: '0.5rem',
          transition: 'all 0.2s',
          backgroundColor: activeTab === 'home' ? '#dbeafe' : 'transparent',
          color: activeTab === 'home' ? '#2563eb' : '#374151',
        }}
      >
        <HomeIcon
          style={{ width: '1.25rem', height: '1.25rem', marginRight: '0.5rem' }}
        />
        主页
      </button>
    </nav>
  );
};

export default Navbar;
