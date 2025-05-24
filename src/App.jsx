import React, { useState } from 'react';
// Import CSS toàn cục (đảm bảo dòng này có trong src/main.jsx)
// import './style.css'; // Hoặc đường dẫn đúng tới file CSS chính

// 1. Import các component Sidebar và Header
// (Đảm bảo đường dẫn chính xác tới vị trí file component của bạn)
import '../src/style.css';
import Sidebar from './components/sidebar';
import Header from './components/header';
import ScoreContent from './components/ScoreContent'; // Đường dẫn tới file của bạn

// Sau này bạn có thể import component cho từng trang ở đây
// import ScorePage from './pages/ScorePage';

function App() {
// NOTE: State để lưu trữ từ khóa tìm kiếm và trường tìm kiếm
  const [searchTerm, setSearchTerm] = useState('');
  const [searchField, setSearchField] = useState(''); // Hoặc một giá trị placeholder khác

  // NOTE: Hàm để Header cập nhật searchTerm
  const handleSearchTermChange = (newTerm) => {
    setSearchTerm(newTerm);
  };

  // NOTE: Hàm để Header (thông qua StudentIdDropdown) cập nhật searchField
  const handleSearchFieldChange = (newField) => {
    setSearchField(newField);
    // Tùy chọn: Bạn có thể muốn reset searchTerm khi người dùng đổi trường tìm kiếm
    // Ví dụ: setSearchTerm('');
  };

  return (
    <div className="dashboard-layout">
      <Sidebar />

      <div className="main-content-wrapper">
        <Header
          searchTerm={searchTerm}
          searchField={searchField} // Sẽ được dùng làm initialValue cho StudentIdDropdown
          onSearchChange={handleSearchTermChange}
          onSearchFieldChange={handleSearchFieldChange} // Sẽ được StudentIdDropdown gọi
        />

        {/* 6. Khu vực nội dung chính của trang - ĐÃ ĐIỀN NỐT */}
        <main className="content-wrapper">
          {/* Đây là nơi ScoreContent được hiển thị */}
          <ScoreContent
            searchTerm={searchTerm}
            searchField={searchField}
          />
          {/* Bạn có thể thêm các Routes hoặc nội dung khác ở đây */}
        </main>

      </div> {/* Kết thúc main-content-wrapper */}

    </div> /* Kết thúc dashboard-layout */
  );
}

export default App;