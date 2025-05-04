// Ví dụ src/components/Sidebar.jsx
import React from 'react';
// import styles from './Sidebar.module.css'; // Nếu dùng CSS Module
// Hoặc import './Sidebar.css'; // Nếu dùng CSS thường
// Hoặc không cần import nếu dùng style.css toàn cục

function Sidebar() {
  return (
    <aside className="sidebar">
      {/* PASTE TOÀN BỘ NỘI DUNG HTML CỦA SIDEBAR VÀO ĐÂY */}
      <div className="sidebar-header">
         {/* ... logo ... */}
      </div>
      <nav className="sidebar-nav">
         {/* ... ul > li > a ... */}
      </nav>
      <div className="sidebar-footer">
         {/* ... illustration & logout ... */}
      </div>
    </aside>
  );
}

export default Sidebar;