import React from 'react';
// Import CSS toàn cục (đảm bảo dòng này có trong src/main.jsx)
// import './style.css'; // Hoặc đường dẫn đúng tới file CSS chính

// 1. Import các component Sidebar và Header
// (Đảm bảo đường dẫn chính xác tới vị trí file component của bạn)
import '.style.css';
import Sidebar from './components/Sidebar';
import Header from './components/Header';

// Sau này bạn có thể import component cho từng trang ở đây
// import ScorePage from './pages/ScorePage';

function App() {
  return (
    // 2. Dựng cấu trúc layout chính với các class đã định nghĩa trong CSS
    <div className="dashboard-layout">

      {/* 3. Render component Sidebar */}
      <Sidebar />

      {/* 4. Phần bao bọc cho nội dung chính (Header và Main Content) */}
      <div className="main-content-wrapper">

        {/* 5. Render component Header */}
        <Header />

        {/* 6. Khu vực nội dung chính của trang */}
        <main className="main-content">
          {/* --- Nội dung thay đổi của từng trang sẽ được render ở đây --- */}
          {/* Hiện tại là placeholder */}
          <h1>Score</h1>
          <p>Đây là nơi sẽ hiển thị danh sách điểm hoặc nội dung trang khác.</p>
          <p>Bạn sẽ cần tạo component riêng cho phần này (ví dụ: ScoreList.jsx) và hiển thị nó ở đây (có thể dùng React Router để định tuyến sau này).</p>
          {/* Ví dụ: <ScorePage /> */}
          {/* --- --- --- --- --- */}
        </main>

      </div> {/* Kết thúc main-content-wrapper */}

    </div> /* Kết thúc dashboard-layout */
  );
}

// 7. Export component App để main.jsx có thể sử dụng
export default App;