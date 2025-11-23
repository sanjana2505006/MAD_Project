import React from 'react';

function StatCard({ title, value, icon: Icon, color, subtext }) {
  return (
    <div className="stat-card">
      <div className="stat-icon" style={{ color }}>
        <Icon size={32} />
      </div>
      <div className="stat-content">
        <p className="stat-title">{title}</p>
        <p className="stat-value">{value}</p>
        <p className="stat-subtext">{subtext}</p>
      </div>
    </div>
  );
}

export default StatCard;
