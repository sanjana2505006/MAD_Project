import { Link } from 'react-router-dom';
import { mockProblems, userStats } from '../data/mockData';
import {
  User,
  Calendar,
  Trophy,
  Clock,
  CheckCircle2,
  TrendingUp,
  Target,
  BookMarked,
  Flame
} from 'lucide-react';

export default function Dashboard() {
  const recentProblems = mockProblems.filter((p) => p.attempts > 0).slice(0, 5);
  const solvedProblems = mockProblems.filter((p) => p.solved);
  const inProgressProblems = mockProblems.filter((p) => p.attempts > 0 && !p.solved);

  return (
    <div className="min-h-screen bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-gradient-to-r from-emerald-500/10 to-blue-500/10 rounded-2xl border border-emerald-500/20 p-8 mb-8">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between">
            <div className="flex items-center space-x-4 mb-4 md:mb-0">
              <div className="bg-slate-800 p-4 rounded-full">
                <User className="w-12 h-12 text-emerald-400" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-white">Welcome back, User!</h1>
                <p className="text-slate-400 mt-1">Keep up the great progress</p>
              </div>
            </div>
            <div className="flex items-center space-x-6">
              <div className="text-center">
                <div className="flex items-center space-x-2 text-emerald-400 mb-1">
                  <Flame className="w-5 h-5" />
                  <span className="text-2xl font-bold">{userStats.streak}</span>
                </div>
                <p className="text-sm text-slate-400">Day Streak</p>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-white mb-1">
                  {userStats.problemsSolved}
                </div>
                <p className="text-sm text-slate-400">Solved</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 hover:border-emerald-500/50 transition-colors">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-green-500/10 p-3 rounded-lg">
                <CheckCircle2 className="w-6 h-6 text-green-400" />
              </div>
            </div>
            <div className="text-3xl font-bold text-white mb-1">{userStats.easy.solved}</div>
            <p className="text-slate-400 text-sm">Easy Solved</p>
            <p className="text-xs text-slate-500 mt-1">of {userStats.easy.total} total</p>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 hover:border-emerald-500/50 transition-colors">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-yellow-500/10 p-3 rounded-lg">
                <Target className="w-6 h-6 text-yellow-400" />
              </div>
            </div>
            <div className="text-3xl font-bold text-white mb-1">{userStats.medium.solved}</div>
            <p className="text-slate-400 text-sm">Medium Solved</p>
            <p className="text-xs text-slate-500 mt-1">of {userStats.medium.total} total</p>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 hover:border-emerald-500/50 transition-colors">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-red-500/10 p-3 rounded-lg">
                <Trophy className="w-6 h-6 text-red-400" />
              </div>
            </div>
            <div className="text-3xl font-bold text-white mb-1">{userStats.hard.solved}</div>
            <p className="text-slate-400 text-sm">Hard Solved</p>
            <p className="text-xs text-slate-500 mt-1">of {userStats.hard.total} total</p>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 hover:border-emerald-500/50 transition-colors">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-purple-500/10 p-3 rounded-lg">
                <Clock className="w-6 h-6 text-purple-400" />
              </div>
            </div>
            <div className="text-3xl font-bold text-white mb-1">{userStats.averageTime}m</div>
            <p className="text-slate-400 text-sm">Avg. Time</p>
            <p className="text-xs text-slate-500 mt-1">per problem</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-white flex items-center">
                <TrendingUp className="w-5 h-5 mr-2 text-emerald-400" />
                Recent Activity
              </h2>
              <Link
                to="/problems"
                className="text-sm text-emerald-400 hover:text-emerald-300 transition-colors"
              >
                View All
              </Link>
            </div>
            <div className="space-y-3">
              {recentProblems.map((problem) => (
                <Link
                  key={problem.id}
                  to={`/problem/${problem.id}`}
                  className="flex items-center justify-between p-4 bg-slate-800/50 rounded-lg hover:bg-slate-800 transition-colors"
                >
                  <div className="flex items-center space-x-3">
                    {problem.solved ? (
                      <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                    ) : (
                      <Clock className="w-5 h-5 text-yellow-400" />
                    )}
                    <div>
                      <p className="text-white font-medium">{problem.title}</p>
                      <p className="text-sm text-slate-400">{problem.category}</p>
                    </div>
                  </div>
                  <span
                    className={`text-xs px-2 py-1 rounded ${
                      problem.difficulty === 'Easy'
                        ? 'bg-green-400/10 text-green-400'
                        : problem.difficulty === 'Medium'
                        ? 'bg-yellow-400/10 text-yellow-400'
                        : 'bg-red-400/10 text-red-400'
                    }`}
                  >
                    {problem.difficulty}
                  </span>
                </Link>
              ))}
            </div>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-white flex items-center">
                <Calendar className="w-5 h-5 mr-2 text-blue-400" />
                Weekly Progress
              </h2>
            </div>
            <div className="space-y-4">
              {userStats.recentActivity.reverse().map((activity, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="bg-slate-800 rounded-lg p-2 w-12 text-center">
                      <p className="text-xs text-slate-400">{activity.date.slice(8)}</p>
                    </div>
                    <div>
                      <p className="text-white text-sm">
                        {activity.problemsSolved} problem{activity.problemsSolved !== 1 ? 's' : ''} solved
                      </p>
                      <p className="text-xs text-slate-500">{activity.timeSpent} minutes</p>
                    </div>
                  </div>
                  {activity.problemsSolved > 0 && (
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-white flex items-center">
                <BookMarked className="w-5 h-5 mr-2 text-purple-400" />
                In Progress
              </h2>
            </div>
            {inProgressProblems.length > 0 ? (
              <div className="space-y-3">
                {inProgressProblems.map((problem) => (
                  <Link
                    key={problem.id}
                    to={`/problem/${problem.id}`}
                    className="flex items-center justify-between p-4 bg-slate-800/50 rounded-lg hover:bg-slate-800 transition-colors"
                  >
                    <div>
                      <p className="text-white font-medium">{problem.title}</p>
                      <p className="text-sm text-slate-400">
                        {problem.attempts} attempt{problem.attempts > 1 ? 's' : ''}
                      </p>
                    </div>
                    <span
                      className={`text-xs px-2 py-1 rounded ${
                        problem.difficulty === 'Easy'
                          ? 'bg-green-400/10 text-green-400'
                          : problem.difficulty === 'Medium'
                          ? 'bg-yellow-400/10 text-yellow-400'
                          : 'bg-red-400/10 text-red-400'
                      }`}
                    >
                      {problem.difficulty}
                    </span>
                  </Link>
                ))}
              </div>
            ) : (
              <p className="text-slate-400 text-center py-8">No problems in progress</p>
            )}
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-white flex items-center">
                <Trophy className="w-5 h-5 mr-2 text-yellow-400" />
                Achievements
              </h2>
            </div>
            <div className="space-y-4">
              <div className="flex items-center space-x-4 p-4 bg-slate-800/50 rounded-lg">
                <div className="bg-emerald-500/10 p-3 rounded-lg">
                  <Flame className="w-6 h-6 text-emerald-400" />
                </div>
                <div>
                  <p className="text-white font-medium">First Steps</p>
                  <p className="text-sm text-slate-400">Solved your first problem</p>
                </div>
              </div>
              <div className="flex items-center space-x-4 p-4 bg-slate-800/50 rounded-lg">
                <div className="bg-blue-500/10 p-3 rounded-lg">
                  <Calendar className="w-6 h-6 text-blue-400" />
                </div>
                <div>
                  <p className="text-white font-medium">Week Warrior</p>
                  <p className="text-sm text-slate-400">5 day solving streak</p>
                </div>
              </div>
              <div className="flex items-center space-x-4 p-4 bg-slate-800/30 rounded-lg opacity-50">
                <div className="bg-purple-500/10 p-3 rounded-lg">
                  <Trophy className="w-6 h-6 text-purple-400" />
                </div>
                <div>
                  <p className="text-white font-medium">Problem Master</p>
                  <p className="text-sm text-slate-400">Solve 50 problems (locked)</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
