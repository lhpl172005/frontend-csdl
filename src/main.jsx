import React from 'react';
import ReactDOM from 'react-dom/client'; // Import ReactDOM từ react-dom/client (cách mới)
import App from './App.jsx'; // Import component App chính của bạn

// Import file CSS chính (toàn cục)
// Đảm bảo đường dẫn này đúng với vị trí file style.css của bạn
import './style.css';

// Tìm đến phần tử HTML có id là 'root' trong file index.html
const rootElement = document.getElementById('root');

// Tạo một "root" cho ứng dụng React tại phần tử đó
const root = ReactDOM.createRoot(rootElement);

// Render component App (và tất cả component con bên trong nó) vào root
root.render(
  <React.StrictMode>
    {/* StrictMode là công cụ kiểm tra lỗi tiềm ẩn trong quá trình phát triển */}
    <App />
  </React.StrictMode>
);
