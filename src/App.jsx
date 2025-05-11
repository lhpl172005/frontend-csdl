import React from 'react';
// Import CSS toàn cục (đảm bảo dòng này có trong src/main.jsx)
// import './style.css'; // Hoặc đường dẫn đúng tới file CSS chính

// 1. Import các component Sidebar và Header
// (Đảm bảo đường dẫn chính xác tới vị trí file component của bạn)
import '../src/style.css';
import Sidebar from './components/sidebar';
import Header from './components/header';

// Sau này bạn có thể import component cho từng trang ở đây
// import ScorePage from './pages/ScorePage';

function App() {
  return (
    <div className="dashboard-layout">
      <Sidebar />

      <div className="main-content-wrapper">
        <Header />

        {/* 6. Khu vực nội dung chính của trang - ĐÃ ĐIỀN NỐT */}
        <main className="main-content">
          {/* --- BẮT ĐẦU NỘI DUNG TRANG SCORE --- */}

          <div className="section-header">
             <h1>Score</h1>
             <button className="add-score-btn">
                 {/* EDIT HERE: Thêm icon Add */}
                 <span className="icon-placeholder"></span>
                 Add Score
            </button>
          </div>

          <div className="controls">
              <div className="filters">
                  <span>Filter:</span>
                  <label htmlFor="filter-from">From:</label>
                  {/* Sau này dùng state và onChange để quản lý giá trị date */}
                  <input type="date" id="filter-from" name="filter-from" />
                  <label htmlFor="filter-to">To:</label>
                  <input type="date" id="filter-to" name="filter-to" />
                  <button type="button" className="apply-btn">Apply</button>
              </div>
              <div className="sort">
                  <span>Sort:</span>
                  {/* Sau này dùng state và onClick để quản lý nút active */}
                  <button type="button" className="sort-btn">Original</button>
                  <button type="button" className="sort-btn">Highest to Lowest</button>
                  <button type="button" className="sort-btn active">Lowest to Highest</button>
              </div>
          </div>

          <div className="score-list">
              {/* Dữ liệu điểm tĩnh - Sau này sẽ map từ state */}
              <article className="score-item">
                  <div className="score-info">
                      <div className="info-group"> <span className="label">Student ID</span> <span className="value">0001</span> </div>
                      <div className="info-group"> <span className="label">Subject ID</span> <span className="value">IT3290</span> </div>
                      <div className="info-group"> <span className="label">Class ID</span> <span className="value">152772</span> </div>
                  </div>
                  <div className="score-value-action">
                      <p className="score-value">8.50</p>
                      <a href="#" className="edit-score-link">
                        {/* EDIT HERE: Thêm icon Edit */}
                        <span className="icon-placeholder"></span> Edit Score
                      </a>
                  </div>
              </article>
              <article className="score-item">
                  <div className="score-info">
                      <div className="info-group"> <span className="label">Student ID</span> <span className="value">0002</span> </div>
                      <div className="info-group"> <span className="label">Subject ID</span> <span className="value">IT3180</span> </div>
                      <div className="info-group"> <span className="label">Class ID</span> <span className="value">152770</span> </div>
                  </div>
                  <div className="score-value-action">
                      <p className="score-value">9.00</p>
                      <a href="#" className="edit-score-link">
                         <span className="icon-placeholder"></span> Edit Score
                      </a>
                  </div>
              </article>
              {/* Thêm các <article class="score-item"> khác nếu muốn hiển thị nhiều hơn */}
          </div>

          <nav className="pagination" aria-label="Pagination">
              {/* Dữ liệu phân trang tĩnh - Sau này sẽ tính toán từ state */}
              <span>1-8 of 28</span>
              {/* Có thể thêm nút Previous/Next ở đây */}
          </nav>

          {/* --- KẾT THÚC NỘI DUNG TRANG SCORE --- */}
        </main>

      </div> {/* Kết thúc main-content-wrapper */}

    </div> /* Kết thúc dashboard-layout */
  );
}

export default App;