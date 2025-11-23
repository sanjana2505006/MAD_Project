import React, { useState } from 'react';
import { Filter, ChevronDown } from 'lucide-react';
import ProblemCard from '../components/ProblemCard';

function Problems({ selectedCategory }) {
  const [difficultyFilter, setDifficultyFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');

  const allProblems = [
    { id: 1, title: 'Two Sum', category: 'Arrays', difficulty: 'Easy', status: 'Solved', date: '2 days ago' },
    { id: 2, title: 'Best Time to Buy and Sell Stock', category: 'Arrays', difficulty: 'Easy', status: 'Solved', date: '3 days ago' },
    { id: 3, title: 'Contains Duplicate', category: 'Arrays', difficulty: 'Easy', status: 'Unsolved', date: 'not started' },
    { id: 4, title: 'Product of Array Except Self', category: 'Arrays', difficulty: 'Medium', status: 'Attempting', date: 'today' },
    { id: 5, title: 'Longest Substring Without Repeating Characters', category: 'Strings', difficulty: 'Medium', status: 'Solved', date: '1 day ago' },
    { id: 6, title: 'Palindrome Number', category: 'Strings', difficulty: 'Easy', status: 'Solved', date: '4 days ago' },
    { id: 7, title: 'Regular Expression Matching', category: 'Strings', difficulty: 'Hard', status: 'Unsolved', date: 'not started' },
    { id: 8, title: 'Climbing Stairs', category: 'Dynamic Programming', difficulty: 'Easy', status: 'Solved', date: '1 day ago' },
    { id: 9, title: 'Coin Change', category: 'Dynamic Programming', difficulty: 'Medium', status: 'Attempting', date: 'today' },
  ];

  const filteredProblems = allProblems.filter(problem => {
    if (selectedCategory && problem.category.toLowerCase() !== selectedCategory) return false;
    if (difficultyFilter !== 'all' && problem.difficulty.toLowerCase() !== difficultyFilter) return false;
    if (statusFilter !== 'all' && problem.status.toLowerCase() !== statusFilter) return false;
    return true;
  });

  return (
    <div className="problems-page">
      <div className="page-header">
        <h2>Problems</h2>
        <p>Practice coding problems by category and difficulty</p>
      </div>

      <div className="filters-section">
        <div className="filter-group">
          <label className="filter-label">
            <Filter size={18} />
            Difficulty:
          </label>
          <div className="filter-select-wrapper">
            <select 
              value={difficultyFilter}
              onChange={(e) => setDifficultyFilter(e.target.value)}
              className="filter-select"
            >
              <option value="all">All Levels</option>
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
            <ChevronDown size={16} className="select-icon" />
          </div>
        </div>

        <div className="filter-group">
          <label className="filter-label">Status:</label>
          <div className="filter-select-wrapper">
            <select 
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="filter-select"
            >
              <option value="all">All Status</option>
              <option value="solved">Solved</option>
              <option value="attempting">Attempting</option>
              <option value="unsolved">Unsolved</option>
            </select>
            <ChevronDown size={16} className="select-icon" />
          </div>
        </div>

        <div className="result-count">
          Found {filteredProblems.length} problem{filteredProblems.length !== 1 ? 's' : ''}
        </div>
      </div>

      <div className="problems-grid">
        {filteredProblems.map(problem => (
          <ProblemCard key={problem.id} {...problem} />
        ))}
      </div>

      {filteredProblems.length === 0 && (
        <div className="no-results">
          <p>No problems found matching your filters.</p>
        </div>
      )}
    </div>
  );
}

export default Problems;
