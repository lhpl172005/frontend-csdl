import React, { useState } from 'react';

import './style.css';
import Sidebar from './components/sidebar';
import Header from './components/header';
import ScoreContent from './components/ScoreContent'; // Đường dẫn tới file của bạn
import StudentContent from './components/StudentContent';
import TeacherContent from './components/TeacherContent';
import ClassContent from './components/ClassContent';
import SubjectContent from './components/SubjectContent';

// Các component cho các trang khác (tạm thời là placeholder)
// const StudentContent = () => <div style={{padding: '20px'}}>Student Page Content - Coming Soon!</div>;
// const TeacherContent = () => <div style={{padding: '20px'}}>Teacher Page Content - Coming Soon!</div>;
// const SubjectContent = () => <div style={{padding: '20px'}}>Subject Page Content - Coming Soon!</div>;
// const ClassContent = () => <div style={{padding: '20px'}}>Class Page Content - Coming Soon!</div>;

function App() {
// NOTE: State để lưu trữ từ khóa tìm kiếm và trường tìm kiếm
  const [searchTerm, setSearchTerm] = useState('');
  const [searchField, setSearchField] = useState(''); // Hoặc một giá trị placeholder khác

  // NOTE: State mới để quản lý trang đang hiển thị
  const [activePage, setActivePage] = useState('score'); // Mặc định là trang 'score'

  // NOTE: Hàm để Header cập nhật searchTerm
  const handleSearchTermChange = (newTerm) => {
    setSearchTerm(newTerm);
  };

  // NOTE: Hàm để Header (thông qua StudentIdDropdown) cập nhật searchField
  const handleSearchFieldChange = (newField) => {
    setSearchField(newField);
    // Tùy chọn: Bạn có thể muốn reset searchTerm khi người dùng đổi trường tìm kiếm
    // Ví dụ: setSearchTerm('');
  }
  
    // NOTE: Hàm để Sidebar gọi khi một mục được chọn
  const handleNavigation = (page) => {
    console.log('Navigating to:', page); // Debug
    setActivePage(page);
    setSearchTerm('');

    // NOTE: Cập nhật searchField dựa trên trang được chọn
    if (page === 'score') {
      setSearchField('studentId'); // Mặc định cho trang Score
    } else if (page === 'student') {
      setSearchField('fullName'); // Mặc định tìm theo tên cho trang Student, hoặc 'studentId' tùy bạn
    } else if (page === 'teacher') { // NOTE: Thêm case cho teacher
      setSearchField('fullName'); // Mặc định tìm theo tên cho trang Teacher
    } else if (page === 'subject') {
      setSearchField('subjectName');
    } else if (page === 'class') {
      setSearchField('classId');
    } else {
      setSearchField(''); // Hoặc một giá trị mặc định chung cho các trang khác
    }
    // Khi chuyển trang, có thể bạn muốn reset searchTerm và searchField
    // setSearchTerm('');
    // setSearchField('studentId'); // Hoặc một giá trị mặc định phù hợp cho trang mới
  };

  // NOTE: Hàm render nội dung chính dựa trên activePage
  const renderMainContent = () => {
    switch (activePage) {
      case 'score':
        return <ScoreContent searchTerm={searchTerm} searchField={searchField} />;
      case 'student':
        return <StudentContent searchTerm={searchTerm} searchField={searchField} />;
      case 'teacher':
        return <TeacherContent searchTerm={searchTerm} searchField={searchField} />;
      case 'subject':
        return <SubjectContent searchTerm={searchTerm} searchField={searchField}/>; // Tạm thời chưa có gì
      case 'class':
        return <ClassContent searchTerm={searchTerm} searchField={searchField}/>; // Tạm thời chưa có gì
      default:
        return <ScoreContent searchTerm={searchTerm} searchField={searchField} />; // Mặc định về trang Score
    }
  };

  return (
    <div className="dashboard-layout">
      <Sidebar activePage={activePage} onNavigate={handleNavigation}/>

      <div className="main-content-wrapper">
        <Header
          searchTerm={searchTerm}
          searchField={searchField} // Sẽ được dùng làm initialValue cho StudentIdDropdown
          onSearchChange={handleSearchTermChange}
          onSearchFieldChange={handleSearchFieldChange} // Sẽ được StudentIdDropdown gọi
          activePage={activePage} // Truyền activePage để Header có thể thay đổi dropdown sau
        />

        {/* NOTE: THAY THẾ ĐOẠN CODE CŨ CỦA BẠN BẰNG DÒNG NÀY */}
        <main className="content-wrapper">
          {renderMainContent()}
        </main>
        {/* Kết thúc main-content-wrapper đã được chuyển ra ngoài nếu bạn có div bao quanh */}
      </div> {/* Kết thúc main-content-wrapper */}

    </div> /* Kết thúc dashboard-layout */
  );
}

export default App;