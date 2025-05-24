import React, { useState, useEffect, useRef } from 'react';
import './StudentIdDropdown.css'; // Đảm bảo file này tồn tại và đúng tên

// Component nhận prop là đường dẫn icon từ Header
function StudentIdDropdown({ dropdownIconSrc, initialValue, onChange, options = [] }) {
  const [isOpen, setIsOpen] = useState(false);

  // selectedValue lưu trữ giá trị thực (ví dụ: 'studentId')
  const [selectedValue, setSelectedValue] = useState(initialValue || (options.length > 0 ? options[0].value : ''));
  const dropdownRef = useRef(null);

  // selectedOptionLabel sẽ là nhãn hiển thị (ví dụ: "Student ID")
  const selectedOptionLabel = options.find(opt => opt.value === selectedValue)?.label || (options.length > 0 ? options[0].label : 'Select Field');

  const toggleDropdown = () => {
    console.log('Dropdown toggled! Current isOpen:', isOpen);
    setIsOpen(prevIsOpen => !prevIsOpen); // Sử dụng callback để đảm bảo giá trị mới nhất
  };

  // NOTE: Sửa lại hàm này để nhận đúng `optionValue` (là một chuỗi)
  const handleOptionClick = (clickedOptionValue) => {
    console.log('Selected value:', clickedOptionValue);
    onChange(clickedOptionValue);         // Gọi hàm onChange từ props với giá trị đã chọn
    setIsOpen(false);
  };

  useEffect(() => {
    if (initialValue) {
      const isValidInitialValue = options.some(opt => opt.value === initialValue);
      if (isValidInitialValue) {
        if (selectedValue !== initialValue) {
            setSelectedValue(initialValue);
        }
      } else if (options.length > 0) {
        setSelectedValue(options[0].value);
        onChange(options[0].value); 
      } else {
        setSelectedValue(''); 
        if (initialValue !== '') onChange(''); 
      }
    } else if (options.length > 0) {
        if (selectedValue !== options[0].value) { 
            setSelectedValue(options[0].value);
        }
    } else {
        setSelectedValue('');
    }
  }, [initialValue, options, onChange]);

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
    <div
      className={`header-item action-box student-id-box ${isOpen ? 'open' : ''}`}
      ref={dropdownRef}
    >
      <button type="button" className="dropdown-toggle" onClick={toggleDropdown}>
        {/* NOTE: Hiển thị selectedOptionLabel thay vì selectedValue */}
        <span className="dropdown-text">{selectedOptionLabel}</span>
        <img src={dropdownIconSrc} alt="Dropdown" className="header-icon dropdown-icon" />
      </button>

      {isOpen && (
        <ul className="dropdown-menu">
          {options.map((option) => ( // option ở đây là object {value, label}
            <li key={option.value}>
              <button
                type="button"
                className={`dropdown-item ${selectedValue === option.value ? 'active' : ''}`}
                // NOTE: onClick gọi handleOptionClick với option.value (là một chuỗi)
                onClick={() => handleOptionClick(option.value)}
              >
                {/* Hiển thị nhãn của option */}
                {option.label}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default StudentIdDropdown;
