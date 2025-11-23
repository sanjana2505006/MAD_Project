import React, { useState } from 'react';
import './styles/index.css';
import './styles/App.css';
import './styles/pages.css';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import MainContent from './components/MainContent';

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [selectedCategory, setSelectedCategory] = useState(null);

  return (
    <div className="app-container">
      <Sidebar 
        isOpen={sidebarOpen} 
        currentPage={currentPage}
        onPageChange={setCurrentPage}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
      />
      <div className="main-layout">
        <Header onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
        <MainContent 
          currentPage={currentPage}
          selectedCategory={selectedCategory}
        />
      </div>
    </div>
  );
}

export default App;
