import React from 'react';
import { createRoot } from 'react-dom/client';
import SiderBar from './SiderBar';

const container = document.getElementById('app-container');
const root = createRoot(container); // createRoot(container!) if you use TypeScript
root.render(<SiderBar />);
