import React from 'react';
import { CheckCircle, Clock, AlertCircle } from 'lucide-react';

function ProblemCard({ id, title, category, difficulty, status, date }) {
  const getDifficultyColor = (diff) => {
    switch (diff.toLowerCase()) {
      case 'easy':
        return '#10b981';
      case 'medium':
        return '#f59e0b';
      case 'hard':
        return '#ef4444';
      default:
        return '#6b7280';
    }
  };

  const getStatusIcon = (stat) => {
    switch (stat.toLowerCase()) {
      case 'solved':
        return <CheckCircle size={18} className="status-solved" />;
      case 'attempting':
        return <Clock size={18} className="status-attempting" />;
      default:
        return <AlertCircle size={18} className="status-unsolved" />;
    }
  };

  return (
    <div className="problem-card">
      <div className="problem-header">
        <div className="problem-title-section">
          {getStatusIcon(status)}
          <h4 className="problem-title">{title}</h4>
        </div>
        <div 
          className="difficulty-badge"
          style={{ borderColor: getDifficultyColor(difficulty) }}
        >
          {difficulty}
        </div>
      </div>
      
      <div className="problem-meta">
        <span className="problem-category">{category}</span>
        <span className="problem-date">{date}</span>
      </div>
      
      <div className="problem-footer">
        <span className={`status-badge status-${status.toLowerCase()}`}>
          {status}
        </span>
      </div>
    </div>
  );
}

export default ProblemCard;
