import React from 'react';

// Import component con là Dropdown
import StudentIdDropdown from './StudentIdDropdown.jsx'; // <<< Kiểm tra lại tên file/component này

// Import các file SVG cho Header
import searchIcon from '../asset/image/header/search-icon.svg';
import notiIcon from '../asset/image/header/noti-icon.svg';
import profilePicture from '../asset/image/header/profile-picture.svg';
import dropdownIcon from '../asset/image/header/dropdown-icon.svg'; // Icon dùng chung

// Import CSS riêng cho Header (nếu có)
// import './header.css';

function Header({ searchTerm, searchField, onSearchChange, onSearchFieldChange }) { // Đổi tên thành Header nếu muốn (PascalCase)
  return (
    // Lấy cấu trúc HTML từ file index.html gốc của bạn
    <header className="main-header">
      <div className="header-item search-box">
        <form action="#">
          <img src={searchIcon} alt="Search" className="header-icon search-icon" />
          <input 
            type="search" 
            placeholder="Search"
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)} // Gọi hàm từ App.jsx
            />
        </form>
      </div>

      <div className="header-actions">
        {/* Render component Dropdown và truyền icon vào */}
        <StudentIdDropdown 
          dropdownIconSrc={dropdownIcon}
          initialValue={searchField} // searchField từ App.jsx làm giá trị ban đầu
          onChange={onSearchFieldChange} // onSearchFieldChange từ App.jsx
        />

        <div className="header-item action-box notification-box">
          <button className="notification-btn" aria-label="Notifications">
            <img src={notiIcon} alt="Notifications" className="header-icon" />
          </button>
        </div>

        <div className="header-item action-box user-box">
          <button aria-label="User Menu">
            <img src={profilePicture} alt="User Avatar" className="avatar" />
            <span className="user-name">Evan Yates</span>
            <img src={dropdownIcon} alt="Dropdown" className="header-icon dropdown-icon" />
          </button>
          {/* Dropdown menu cho user sẽ nằm ở đây */}
        </div>
      </div>
    </header>
  );
}

// Đổi tên export nếu bạn đổi tên function
export default Header; // Hoặc export default header;