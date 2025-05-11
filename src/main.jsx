import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';

// Import file CSS chính (toàn cục)
// Đảm bảo file này tồn tại và chứa các style layout chung, biến :root
import './style.css';

const rootElement = document.getElementById('root');
const root = ReactDOM.createRoot(rootElement);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);