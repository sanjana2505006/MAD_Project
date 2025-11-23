import React from 'react';
import Dashboard from '../pages/Dashboard';
import Problems from '../pages/Problems';
import Progress from '../pages/Progress';
import Forum from '../pages/Forum';

function MainContent({ currentPage, selectedCategory }) {
  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard />;
      case 'problems':
        return <Problems selectedCategory={selectedCategory} />;
      case 'progress':
        return <Progress />;
      case 'forum':
        return <Forum />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <main className="main-content">
      {renderPage()}
    </main>
  );
}

export default MainContent;
