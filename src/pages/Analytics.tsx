import { Line, Doughnut, Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';
import { mockProblems, userStats } from '../data/mockData';
import { TrendingUp, Clock, Target, Award } from 'lucide-react';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

export default function Analytics() {
  const activityData = {
    labels: userStats.recentActivity.map((a) => a.date.slice(5)),
    datasets: [
      {
        label: 'Problems Solved',
        data: userStats.recentActivity.map((a) => a.problemsSolved),
        borderColor: 'rgb(16, 185, 129)',
        backgroundColor: 'rgba(16, 185, 129, 0.1)',
        fill: true,
        tension: 0.4
      }
    ]
  };

  const timeData = {
    labels: userStats.recentActivity.map((a) => a.date.slice(5)),
    datasets: [
      {
        label: 'Time Spent (minutes)',
        data: userStats.recentActivity.map((a) => a.timeSpent),
        backgroundColor: 'rgba(59, 130, 246, 0.8)',
        borderRadius: 6
      }
    ]
  };

  const difficultyData = {
    labels: ['Easy', 'Medium', 'Hard'],
    datasets: [
      {
        data: [
          userStats.easy.solved,
          userStats.medium.solved,
          userStats.hard.solved
        ],
        backgroundColor: [
          'rgba(34, 197, 94, 0.8)',
          'rgba(234, 179, 8, 0.8)',
          'rgba(239, 68, 68, 0.8)'
        ],
        borderWidth: 0
      }
    ]
  };

  const categoryStats = mockProblems.reduce((acc, problem) => {
    if (!acc[problem.category]) {
      acc[problem.category] = { total: 0, solved: 0 };
    }
    acc[problem.category].total++;
    if (problem.solved) {
      acc[problem.category].solved++;
    }
    return acc;
  }, {} as Record<string, { total: number; solved: number }>);

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false
      }
    },
    scales: {
      x: {
        grid: {
          color: 'rgba(148, 163, 184, 0.1)'
        },
        ticks: {
          color: 'rgb(148, 163, 184)'
        }
      },
      y: {
        grid: {
          color: 'rgba(148, 163, 184, 0.1)'
        },
        ticks: {
          color: 'rgb(148, 163, 184)'
        }
      }
    }
  };

  const doughnutOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom' as const,
        labels: {
          color: 'rgb(148, 163, 184)',
          padding: 20
        }
      }
    }
  };

  return (
    <div className="min-h-screen bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Analytics Dashboard</h1>
          <p className="text-slate-400">Track your progress and performance metrics</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-emerald-500/10 p-3 rounded-lg">
                <Target className="w-6 h-6 text-emerald-400" />
              </div>
              <span className="text-2xl font-bold text-white">
                {userStats.problemsSolved}/{userStats.totalProblems}
              </span>
            </div>
            <h3 className="text-slate-400 text-sm font-medium">Problems Solved</h3>
            <div className="mt-2 w-full bg-slate-800 rounded-full h-2">
              <div
                className="bg-emerald-500 h-2 rounded-full transition-all"
                style={{
                  width: `${(userStats.problemsSolved / userStats.totalProblems) * 100}%`
                }}
              ></div>
            </div>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-blue-500/10 p-3 rounded-lg">
                <TrendingUp className="w-6 h-6 text-blue-400" />
              </div>
              <span className="text-2xl font-bold text-white">{userStats.streak}</span>
            </div>
            <h3 className="text-slate-400 text-sm font-medium">Day Streak</h3>
            <p className="text-xs text-slate-500 mt-2">Keep it going!</p>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-purple-500/10 p-3 rounded-lg">
                <Clock className="w-6 h-6 text-purple-400" />
              </div>
              <span className="text-2xl font-bold text-white">{userStats.averageTime}m</span>
            </div>
            <h3 className="text-slate-400 text-sm font-medium">Avg. Solve Time</h3>
            <p className="text-xs text-slate-500 mt-2">Per problem</p>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-yellow-500/10 p-3 rounded-lg">
                <Award className="w-6 h-6 text-yellow-400" />
              </div>
              <span className="text-2xl font-bold text-white">{userStats.totalAttempts}</span>
            </div>
            <h3 className="text-slate-400 text-sm font-medium">Total Attempts</h3>
            <p className="text-xs text-slate-500 mt-2">All problems</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
            <h2 className="text-lg font-semibold text-white mb-4">Activity Trend</h2>
            <div className="h-64">
              <Line data={activityData} options={chartOptions} />
            </div>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
            <h2 className="text-lg font-semibold text-white mb-4">Time Investment</h2>
            <div className="h-64">
              <Bar data={timeData} options={chartOptions} />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
            <h2 className="text-lg font-semibold text-white mb-4">Difficulty Distribution</h2>
            <div className="h-64 flex items-center justify-center">
              <Doughnut data={difficultyData} options={doughnutOptions} />
            </div>
            <div className="grid grid-cols-3 gap-4 mt-6">
              <div className="text-center">
                <div className="text-sm text-slate-400">Easy</div>
                <div className="text-lg font-semibold text-green-400">
                  {userStats.easy.solved}/{userStats.easy.total}
                </div>
              </div>
              <div className="text-center">
                <div className="text-sm text-slate-400">Medium</div>
                <div className="text-lg font-semibold text-yellow-400">
                  {userStats.medium.solved}/{userStats.medium.total}
                </div>
              </div>
              <div className="text-center">
                <div className="text-sm text-slate-400">Hard</div>
                <div className="text-lg font-semibold text-red-400">
                  {userStats.hard.solved}/{userStats.hard.total}
                </div>
              </div>
            </div>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
            <h2 className="text-lg font-semibold text-white mb-4">Category Progress</h2>
            <div className="space-y-4">
              {Object.entries(categoryStats).map(([category, stats]) => (
                <div key={category}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-slate-300">{category}</span>
                    <span className="text-sm text-slate-400">
                      {stats.solved}/{stats.total}
                    </span>
                  </div>
                  <div className="w-full bg-slate-800 rounded-full h-2">
                    <div
                      className="bg-emerald-500 h-2 rounded-full transition-all"
                      style={{
                        width: `${(stats.solved / stats.total) * 100}%`
                      }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
          <h2 className="text-lg font-semibold text-white mb-4">Performance Insights</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-slate-800/50 rounded-lg p-4">
              <h3 className="text-emerald-400 font-semibold mb-2">Strengths</h3>
              <ul className="text-sm text-slate-300 space-y-1">
                <li>• Arrays and Hash Tables</li>
                <li>• Linked List manipulation</li>
                <li>• Fast problem-solving speed</li>
              </ul>
            </div>
            <div className="bg-slate-800/50 rounded-lg p-4">
              <h3 className="text-yellow-400 font-semibold mb-2">Focus Areas</h3>
              <ul className="text-sm text-slate-300 space-y-1">
                <li>• Dynamic Programming</li>
                <li>• Graph algorithms</li>
                <li>• Hard difficulty problems</li>
              </ul>
            </div>
            <div className="bg-slate-800/50 rounded-lg p-4">
              <h3 className="text-blue-400 font-semibold mb-2">Recommendations</h3>
              <ul className="text-sm text-slate-300 space-y-1">
                <li>• Practice 2-3 problems daily</li>
                <li>• Review previous solutions</li>
                <li>• Join discussion forums</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
