import React, { useState, useEffect, useRef } from 'react';

// Import CSS riêng cho Dropdown
import './StudentIdDropdown.css'; // Đảm bảo file này tồn tại và đúng tên

// Component nhận prop là đường dẫn icon từ Header
function StudentIdDropdown({ dropdownIconSrc }) { // Tên component nên là PascalCase
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState('Student ID');
  const dropdownRef = useRef(null);
  const options = ['Student ID', 'Subject ID', 'Class ID'];

  const toggleDropdown = () => {
    console.log('Dropdown toggled!'); // Debug
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (option) => {
    console.log('Selected:', option); // Debug
    setSelectedOption(option);
    setIsOpen(false);
  };

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
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  return (
    // Lấy cấu trúc HTML từ file index.html gốc của bạn
    <div
      className={`header-item action-box student-id-box ${isOpen ? 'open' : ''}`}
      ref={dropdownRef}
    >
      <button type="button" className="dropdown-toggle" onClick={toggleDropdown}>
        <span className="dropdown-text">{selectedOption}</span>
        {/* Sử dụng prop icon */}
        <img src={dropdownIconSrc} alt="Dropdown" className="header-icon dropdown-icon" />
      </button>

      {/* Menu dropdown từ index.html */}
      <ul className="dropdown-menu">
        {options.map((option) => (
          <li key={option}>
            <button
              type="button"
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

// Đổi tên export nếu bạn đổi tên function/file
export default StudentIdDropdown; // Hoặc export default studentID_dropdown;