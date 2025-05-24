import React from 'react';

// Import các file SVG cho Sidebar
// Đường dẫn tương đối từ components/sidebar.jsx đến asset/image/sidebar/
import logoSvg from '../asset/image/sidebar/logo.svg';
import scoreIcon from '../asset/image/sidebar/score-icon.svg';
import studentIcon from '../asset/image/sidebar/student-icon-active.svg';
import teacherIcon from '../asset/image/sidebar/teacher-icon-active.svg';
import subjectIcon from '../asset/image/sidebar/subject-icon-active.svg';
import classIcon from '../asset/image/sidebar/class-icon-active.svg';
import illustratorSvg from '../asset/image/sidebar/sidebar-illustrator.svg';
import logoutIcon from '../asset/image/sidebar/logout.svg';

// Import file CSS riêng cho Sidebar (nếu có)
import './sidebar.css'; // Đảm bảo file này tồn tại

function Sidebar({ activePage, onNavigate }) { // Đổi tên thành Sidebar nếu muốn (PascalCase)
  // const [activeItem, setActiveItem] = useState('Score');

  const navItems = [
    { key: 'score', label: 'Score', iconSrc: scoreIcon },
    { key: 'student', label: 'Student', iconSrc: studentIcon },
    { key: 'teacher', label: 'Teacher', iconSrc: teacherIcon },
    { key: 'subject', label: 'Subject', iconSrc: subjectIcon },
    { key: 'class', label: 'Class', iconSrc: classIcon },
  ];

  const handleItemClick = (itemKey) => {
    console.log('Sidebar item clicked:', itemKey); // Giữ lại để debug
    onNavigate(itemKey);
  };

  return (
    // Lấy cấu trúc HTML từ file index.html gốc của bạn
    <aside className="sidebar">
      <div className="sidebar-header">
        <a href="#" className="logo">
          <img src={logoSvg} alt="Logo" />
        </a>
      </div>

      <nav className="sidebar-nav">
        <ul>
          {navItems.map((item) => (
            <li 
              key={item.key} 
              className={activePage === item.key ? 'active' : ''}>
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  handleItemClick(item.key);
                }}
              >
                {/* Sử dụng biến icon đã import */}
                <img src={item.iconSrc} alt="" className="nav-icon" />
                <span>{item.label}</span>
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <div className="sidebar-footer">
        <div className="illustration-container">
          <img src={illustratorSvg} alt="Illustration" />
        </div>
        <a href="#" className="logout-link">
          <img src={logoutIcon} alt="" className="nav-icon" />
          <span>Logout</span>
        </a>
      </div>
    </aside>
  );
}

// Đổi tên export nếu bạn đổi tên function
export default Sidebar; // Hoặc export default sidebar;