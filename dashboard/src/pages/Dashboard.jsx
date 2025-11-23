import React from 'react';
import { TrendingUp, Flame, Target, Clock } from 'lucide-react';
import StatCard from '../components/StatCard';
import ProblemCard from '../components/ProblemCard';

function Dashboard() {
  const stats = [
    {
      title: 'Total Solved',
      value: 42,
      icon: Target,
      color: '#3b82f6',
      subtext: '5 this week'
    },
    {
      title: 'Current Streak',
      value: 7,
      icon: Flame,
      color: '#ef4444',
      subtext: 'days in a row'
    },
    {
      title: 'Avg. Time',
      value: '12m',
      icon: Clock,
      color: '#10b981',
      subtext: 'per problem'
    },
    {
      title: 'Acceptance Rate',
      value: '84%',
      icon: TrendingUp,
      color: '#8b5cf6',
      subtext: 'overall'
    }
  ];

  const recentProblems = [
    {
      id: 1,
      title: 'Two Sum',
      category: 'Arrays',
      difficulty: 'Easy',
      status: 'Solved',
      date: '2 days ago'
    },
    {
      id: 2,
      title: 'Longest Substring Without Repeating Characters',
      category: 'Strings',
      difficulty: 'Medium',
      status: 'Solved',
      date: '1 day ago'
    },
    {
      id: 3,
      title: 'Climbing Stairs',
      category: 'Dynamic Programming',
      difficulty: 'Easy',
      status: 'Solved',
      date: 'Today'
    },
    {
      id: 4,
      title: 'Word Ladder',
      category: 'Algorithms',
      difficulty: 'Hard',
      status: 'Attempting',
      date: 'Today'
    }
  ];

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h2>Welcome back, Sanjana! 👋</h2>
        <p>Here's your coding progress overview</p>
      </div>

      <div className="stats-grid">
        {stats.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>

      <div className="dashboard-section">
        <div className="section-header">
          <h3>Recent Activity</h3>
          <a href="#" className="view-all-link">View all →</a>
        </div>
        
        <div className="problems-list">
          {recentProblems.map(problem => (
            <ProblemCard key={problem.id} {...problem} />
          ))}
        </div>
      </div>

      <div className="dashboard-footer">
        <div className="quick-stats">
          <div className="quick-stat">
            <span className="stat-label">This Week</span>
            <span className="stat-value">5 problems</span>
          </div>
          <div className="quick-stat">
            <span className="stat-label">This Month</span>
            <span className="stat-value">18 problems</span>
          </div>
          <div className="quick-stat">
            <span className="stat-label">All Time</span>
            <span className="stat-value">42 problems</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
