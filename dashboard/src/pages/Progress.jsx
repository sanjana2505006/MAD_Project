import React from 'react';
import { TrendingUp, Calendar } from 'lucide-react';

function Progress() {
  const weeklyData = [
    { day: 'Mon', problems: 2, time: 45 },
    { day: 'Tue', problems: 3, time: 62 },
    { day: 'Wed', problems: 1, time: 28 },
    { day: 'Thu', problems: 4, time: 85 },
    { day: 'Fri', problems: 2, time: 38 },
    { day: 'Sat', problems: 5, time: 120 },
    { day: 'Sun', problems: 0, time: 0 },
  ];

  const maxProblems = Math.max(...weeklyData.map(d => d.problems));

  const categoryStats = [
    { name: 'Arrays', solved: 12, total: 18, percentage: 67 },
    { name: 'Strings', solved: 8, total: 12, percentage: 67 },
    { name: 'Dynamic Programming', solved: 6, total: 15, percentage: 40 },
    { name: 'Algorithms', solved: 10, total: 20, percentage: 50 },
    { name: 'Graphs', solved: 4, total: 10, percentage: 40 },
  ];

  return (
    <div className="progress-page">
      <div className="page-header">
        <h2>Your Progress</h2>
        <p>Track your coding journey and improvements</p>
      </div>

      <div className="progress-grid">
        <div className="progress-card">
          <div className="card-header">
            <h3>Weekly Activity</h3>
            <Calendar size={20} />
          </div>
          
          <div className="chart-container">
            <div className="bar-chart">
              {weeklyData.map((data, index) => (
                <div key={index} className="chart-bar-group">
                  <div className="bar-wrapper">
                    <div 
                      className="bar" 
                      style={{
                        height: maxProblems > 0 ? `${(data.problems / maxProblems) * 100}%` : '0%'
                      }}
                    >
                      {data.problems > 0 && <span className="bar-value">{data.problems}</span>}
                    </div>
                  </div>
                  <span className="bar-label">{data.day}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="progress-card">
          <div className="card-header">
            <h3>Category Performance</h3>
            <TrendingUp size={20} />
          </div>
          
          <div className="category-list">
            {categoryStats.map((cat, index) => (
              <div key={index} className="category-item">
                <div className="category-info">
                  <span className="category-name">{cat.name}</span>
                  <span className="category-stats">{cat.solved}/{cat.total}</span>
                </div>
                <div className="progress-bar-wrapper">
                  <div className="progress-bar">
                    <div 
                      className="progress-fill"
                      style={{ width: `${cat.percentage}%` }}
                    />
                  </div>
                  <span className="progress-percent">{cat.percentage}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="progress-card full-width">
        <div className="card-header">
          <h3>Statistics</h3>
        </div>
        
        <div className="stats-table">
          <div className="stats-row header">
            <div className="stat-cell">Metric</div>
            <div className="stat-cell">Value</div>
            <div className="stat-cell">Trend</div>
          </div>
          {[
            { metric: 'Total Problems Solved', value: '42', trend: '↑ 5 this week' },
            { metric: 'Current Streak', value: '7 days', trend: '↑ 2 more' },
            { metric: 'Avg. Time per Problem', value: '12min', trend: '↓ 2min less' },
            { metric: 'Accuracy Rate', value: '84%', trend: '↑ 4% up' },
          ].map((stat, index) => (
            <div key={index} className="stats-row">
              <div className="stat-cell">{stat.metric}</div>
              <div className="stat-cell value">{stat.value}</div>
              <div className="stat-cell trend">{stat.trend}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Progress;
