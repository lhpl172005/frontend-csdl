import React, { useState, useEffect } from 'react'; // THÊM useState, useEffect
import './ScoreContent.css';
// Đường dẫn này bạn giữ nguyên nếu đúng với cấu trúc thư mục của bạn
import PlusIcon from '../asset/image/top-section/plus.svg';
import AddScoreModal from './AddScoreModal'; // Import modal mới

// --- DỮ LIỆU MẪU ---
const generateMockScores = (count = 25) => {
  const mockScores = [];
  const subjects = ['IT3290', 'MI1134', 'IT4110', 'IT3292', 'IT3280', 'IT3282', 'SSH1121', 'IT3103'];
  const classPrefixes = ['152', '153', '154'];

  for (let i = 1; i <= count; i++) {
    const studentId = String(1000 + i).padStart(4, '0');
    const subjectId = subjects[Math.floor(Math.random() * subjects.length)];
    const classId = classPrefixes[Math.floor(Math.random() * classPrefixes.length)] + String(Math.floor(Math.random() * 900) + 100).padStart(3,'0');
    const score = parseFloat((Math.random() * 6 + 4).toFixed(2)); // Điểm từ 4.00 đến 10.00

    mockScores.push({
      id: `score-${i}`,
      studentId,
      subjectId,
      classId,
      score,
    });
  }
  return mockScores;
};

// --- COMPONENT THẺ ĐIỂM ---
const ScoreCard = ({ scoreData }) => {
  const handleEditScore = () => {
    console.log('Edit score for Student ID:', scoreData.studentId, 'Subject ID:', scoreData.subjectId);
  };

  return (
    <div className="score-card">
      <div className="score-card-decorator"></div>
      <div className="score-card-info">
        <div className="info-group">
          <span className="info-label">Student ID</span>
          <span className="info-value">{scoreData.studentId}</span>
        </div>
        <div className="info-group">
          <span className="info-label">Subject ID</span>
          <span className="info-value">{scoreData.subjectId}</span>
        </div>
        <div className="info-group">
          <span className="info-label">Class ID</span>
          <span className="info-value">{scoreData.classId}</span>
        </div>
      </div>
      <div className="score-card-actions">
        <span className="score-value-main">{scoreData.score.toFixed(2)}</span>
        <button className="edit-score-button" onClick={handleEditScore}>
          {/* <img src={EditIcon} alt="Edit" className="edit-score-icon" /> */}
          <span className="edit-score-icon-placeholder">+</span>
          Edit Score
        </button>
      </div>
    </div>
  );
};


// --- COMPONENT CHÍNH ---
const ScoreContent = ({searchTerm, searchField}) => {
  const [allScores, setAllScores] = useState([]);
  const [filteredScores, setFilteredScores] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const scoresPerPage = 10;

  const [scoreFrom, setScoreFrom] = useState('');
  const [scoreTo, setScoreTo] = useState('');
  const [currentSort, setCurrentSort] = useState('original');

  // NOTE: State để quản lý việc mở/đóng modal
  const [isAddScoreModalOpen, setIsAddScoreModalOpen] = useState(false);

  useEffect(() => {
    const generatedScores = generateMockScores(25);
    setAllScores(generatedScores);
    console.log('[ScoreContent] Mock scores generated:', generatedScores);
  }, []);

  useEffect(() => {
    console.log('[ScoreContent] Filtering useEffect triggered. Dependencies:', {
      allScoresCount: allScores.length,
      scoreFrom,
      scoreTo,
      currentSort,
      searchTerm,
      searchField,
    });

    let scoresToProcess = [...allScores];
    console.log('[ScoreContent] Initial scoresToProcess count:', scoresToProcess.length);

    // BƯỚC 0: LỌC THEO TÌM KIẾM CHUNG (TỪ HEADER)
    if (searchTerm && searchField) {
      console.log(`[ScoreContent] Applying search: term="${searchTerm}", field="${searchField}"`);
      const termToSearch = searchTerm.toLowerCase();
      scoresToProcess = scoresToProcess.filter(score => {
        const fieldValue = score[searchField] ? String(score[searchField]).toLowerCase() : '';
        const isMatch = fieldValue.includes(termToSearch);
        // console.log(`  Checking score ID ${score.id} (${searchField}: "${fieldValue}") against "${termToSearch}". Match: ${isMatch}`);
        return isMatch;
      });
      console.log('[ScoreContent] Scores after search filter:', scoresToProcess.length, scoresToProcess.map(s => ({id: s.id, [searchField]: s[searchField]})));
    } else {
      console.log('[ScoreContent] Skipping search filter: searchTerm or searchField is falsy.');
    }

    // BƯỚC 1: LỌC THEO KHOẢNG ĐIỂM
    if (scoreFrom !== '' || scoreTo !== '') {
      console.log(`[ScoreContent] Applying score filter: from="${scoreFrom}", to="${scoreTo}"`);
      const from = scoreFrom === '' ? -Infinity : parseFloat(scoreFrom);
      const to = scoreTo === '' ? Infinity : parseFloat(scoreTo);
      scoresToProcess = scoresToProcess.filter(
        (score) => score.score >= from && score.score <= to
      );
      console.log('[ScoreContent] Scores after score range filter:', scoresToProcess.length);
    }

    // BƯỚC 2: SẮP XẾP
    if (currentSort !== 'original' && scoresToProcess.length > 0) {
        console.log(`[ScoreContent] Applying sort: type="${currentSort}"`);
        if (currentSort === 'highest') {
          scoresToProcess.sort((a, b) => b.score - a.score);
        } else if (currentSort === 'lowest') {
          scoresToProcess.sort((a, b) => a.score - b.score);
        }
        console.log('[ScoreContent] Scores after sort:', scoresToProcess.map(s => ({id: s.id, score: s.score})));
    }
    
    setFilteredScores(scoresToProcess);
    if (scoresToProcess.length > 0 && allScores.length > 0) { // Chỉ reset page nếu có thay đổi thực sự hoặc có data
        setCurrentPage(1);
        console.log('[ScoreContent] Set filteredScores count:', scoresToProcess.length, 'and reset to page 1.');
    }
  }, [allScores, scoreFrom, scoreTo, currentSort, searchTerm, searchField]);


  const indexOfLastScore = currentPage * scoresPerPage;
  const indexOfFirstScore = indexOfLastScore - scoresPerPage;
  const currentScoresToDisplay = filteredScores.slice(indexOfFirstScore, indexOfLastScore);
  const totalPages = Math.ceil(filteredScores.length / scoresPerPage);

  const paginate = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
    else if (totalPages === 0 || pageNumber < 1) {
      setCurrentPage(1);
    }
  };

  // NOTE: Hàm xử lý khi submit form từ modal
  const handleAddScoreSubmit = (newScoreData) => {
    console.log('Adding new score:', newScoreData);
    const newScoreEntry = {
      ...newScoreData,
      id: `score-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`, // Tạo ID duy nhất hơn
    };
    setAllScores(prevScores => [...prevScores, newScoreEntry]);
    setIsAddScoreModalOpen(false); // Đóng modal sau khi thêm
    // Tùy chọn: Chuyển đến trang cuối cùng để xem mục mới thêm
    // const newTotalPages = Math.ceil((allScores.length + 1) / scoresPerPage);
    // setCurrentPage(newTotalPages);
  };

  const handleApplyFilter = () => {
    // useEffect sẽ tự động xử lý filter và sort khi scoreFrom, scoreTo, currentSort thay đổi.
    // Nút Apply có thể không cần thiết nếu bạn muốn filter "live".
    // Tuy nhiên, nếu bạn muốn chỉ filter khi nhấn Apply, bạn sẽ cần điều chỉnh logic trong useEffect
    // hoặc di chuyển logic filter/sort vào đây và gọi setFilteredScores.
    // Hiện tại, useEffect đã bao gồm logic này, nên hàm này có thể để trống hoặc
    // dùng để set lại state nào đó nếu cần trigger useEffect một cách có chủ đích.
    // Để đơn giản, ta có thể coi như useEffect đã xử lý.
    // Nếu bạn muốn nút Apply thực sự trigger, bạn có thể gọi lại logic filter/sort ở đây:
    let scoresToProcess = [...allScores];
    if (scoreFrom !== '' || scoreTo !== '') {
      const from = scoreFrom === '' ? -Infinity : parseFloat(scoreFrom);
      const to = scoreTo === '' ? Infinity : parseFloat(scoreTo);
      scoresToProcess = scoresToProcess.filter(
        (score) => score.score >= from && score.score <= to
      );
    }
    if (currentSort === 'highest') {
      scoresToProcess.sort((a, b) => b.score - a.score);
    } else if (currentSort === 'lowest') {
      scoresToProcess.sort((a, b) => a.score - b.score);
    }
    setFilteredScores(scoresToProcess);
    setCurrentPage(1); // Luôn reset về trang 1 khi apply filter mới
    console.log('[ScoreContent] Apply button clicked, re-filtered scores.');
  };


  return (
    <div className="score-content-container">
      <div className="score-header">
        <h1 className="score-title">Score</h1>
        <button 
          className="add-score-button"
          onClick={() => {
          console.log('Add Score button clicked, setting isAddScoreModalOpen to true'); // THÊM DÒNG NÀY ĐỂ DEBUG
          setIsAddScoreModalOpen(true);
          }}
        >
          <img src={PlusIcon} alt="Add" className="add-score-icon" />
          Add Score
        </button>
      </div>

      <div className="controls-row">
        <div className="filter-container">
          <span className="filter-label">Filter:</span>
          <input
            type="number"
            placeholder="Score"
            className="score-input"
            aria-label="From score"
            value={scoreFrom}
            onChange={(e) => setScoreFrom(e.target.value)}
          />
          <span className="filter-separator">To</span>
          <input
            type="number"
            placeholder="Score"
            className="score-input"
            aria-label="To score"
            value={scoreTo}
            onChange={(e) => setScoreTo(e.target.value)}
          />
          <button className="apply-button" onClick={handleApplyFilter}>Apply</button>
        </div>

        <div className="sort-container">
          <span className="sort-label">Sort:</span>
          <button className={`sort-button original ${currentSort === 'original' ? 'active' : ''}`} onClick={() => setCurrentSort('original')}>Original</button>
          <button className={`sort-button highest ${currentSort === 'highest' ? 'active' : ''}`} onClick={() => setCurrentSort('highest')}>Highest to Lowest</button>
          <button className={`sort-button lowest ${currentSort === 'lowest' ? 'active' : ''}`} onClick={() => setCurrentSort('lowest')}>Lowest to Highest</button>
        </div>
      </div>

      <div className="score-list">
        {currentScoresToDisplay.length > 0 ? (
          currentScoresToDisplay.map((score) => (
            <ScoreCard key={score.id} scoreData={score} />
          ))
        ) : (
          <p className="no-scores-message">No scores found matching your criteria.</p>
        )}
      </div>

      {totalPages > 1 && (
        <div className="pagination-controls">
          <button
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
            className="pagination-button"
          >
            &larr;
          </button>
          <span className="pagination-info">
            {filteredScores.length > 0 ? `${indexOfFirstScore + 1}-${Math.min(indexOfLastScore, filteredScores.length)}` : '0'} of {filteredScores.length}
          </span>
          <button
            onClick={() => paginate(currentPage + 1)}
            disabled={currentPage === totalPages || filteredScores.length === 0}
            className="pagination-button"
          >
            &rarr;
          </button>
        </div>
      )}

      {/* NOTE: Render Modal */}
      <AddScoreModal
        isOpen={isAddScoreModalOpen}
        onClose={() => setIsAddScoreModalOpen(false)}
        onAddScore={handleAddScoreSubmit}
      />
    </div>
  );
};

export default ScoreContent; // XÓA dấu } thừa ở đây
