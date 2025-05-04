import React, { useState, useEffect, useRef } from 'react';
// Bước 1: Import file CSS thường (đặt cùng cấp component hoặc sửa đường dẫn)
import './StudentIdDropdown.css';

function StudentIdDropdown() {
  // State quản lý trạng thái mở/đóng
  const [isOpen, setIsOpen] = useState(false);
  // State quản lý lựa chọn hiện tại
  const [selectedOption, setSelectedOption] = useState('Student ID');
  // Ref để tham chiếu DOM element, xử lý click outside
  const dropdownRef = useRef(null);

  // Danh sách các options
  const options = ['Student ID', 'Subject ID', 'Class ID'];

  // Hàm xử lý bật/tắt dropdown
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  // Hàm xử lý khi chọn một option
  const handleOptionClick = (option) => {
    setSelectedOption(option); // Cập nhật text hiển thị
    setIsOpen(false); // Đóng dropdown
    console.log('Selected:', option); // Bạn có thể thêm logic khác ở đây
  };

  // Xử lý click ra ngoài để đóng dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    // Cleanup listener khi component unmount
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  return (
    // Sử dụng class name dạng chuỗi, thêm class 'open' khi isOpen là true
    <div
      className={`header-item action-box student-id-box ${isOpen ? 'open' : ''}`}
      ref={dropdownRef}
    >
      <button type="button" className="dropdown-toggle" onClick={toggleDropdown}>
        <span className="dropdown-text">{selectedOption}</span>
        {/* EDIT HERE: Đảm bảo đường dẫn SVG đúng */}
        <img src="img/header/dropdown-icon.svg" alt="Dropdown" className="header-icon dropdown-icon" />
      </button>

      {/* Menu dropdown */}
      <ul className="dropdown-menu">
        {options.map((option) => (
          <li key={option}>
            <button
              type="button"
              // Thêm class 'active' nếu option này đang được chọn
              className={`dropdown-item ${selectedOption === option ? 'active' : ''}`}
              onClick={() => handleOptionClick(option)}
            >
              {option}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default StudentIdDropdown;