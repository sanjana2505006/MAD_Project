import { Link } from 'react-router-dom';
import { Code2, Target, TrendingUp, Users, BookOpen, Zap } from 'lucide-react';

export default function Landing() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-20">
          <div className="flex justify-center mb-6">
            <div className="bg-emerald-500/10 p-4 rounded-2xl">
              <Code2 className="w-16 h-16 text-emerald-400" />
            </div>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Master Coding with
            <span className="block text-emerald-400 mt-2">Focus & Practice</span>
          </h1>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto mb-8">
            An all-in-one platform for coding practice, problem-solving, and skill development.
            Track your progress, analyze your performance, and level up your programming skills.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/problems"
              className="px-8 py-4 bg-emerald-500 text-white text-lg font-semibold rounded-xl hover:bg-emerald-600 transition-colors shadow-lg shadow-emerald-500/20"
            >
              Start Practicing
            </Link>
            <Link
              to="/dashboard"
              className="px-8 py-4 bg-slate-700 text-white text-lg font-semibold rounded-xl hover:bg-slate-600 transition-colors"
            >
              View Dashboard
            </Link>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-20">
          <div className="bg-slate-800/50 backdrop-blur-sm p-8 rounded-2xl border border-slate-700 hover:border-emerald-500/50 transition-colors">
            <div className="bg-blue-500/10 w-14 h-14 rounded-xl flex items-center justify-center mb-4">
              <Target className="w-7 h-7 text-blue-400" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-3">Curated Problems</h3>
            <p className="text-slate-400">
              Carefully selected coding challenges organized by topic and difficulty to help you
              build strong fundamentals and problem-solving skills.
            </p>
          </div>

          <div className="bg-slate-800/50 backdrop-blur-sm p-8 rounded-2xl border border-slate-700 hover:border-emerald-500/50 transition-colors">
            <div className="bg-emerald-500/10 w-14 h-14 rounded-xl flex items-center justify-center mb-4">
              <TrendingUp className="w-7 h-7 text-emerald-400" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-3">Track Progress</h3>
            <p className="text-slate-400">
              Visualize your learning journey with detailed analytics, performance metrics,
              and insights into your strengths and areas for improvement.
            </p>
          </div>

          <div className="bg-slate-800/50 backdrop-blur-sm p-8 rounded-2xl border border-slate-700 hover:border-emerald-500/50 transition-colors">
            <div className="bg-purple-500/10 w-14 h-14 rounded-xl flex items-center justify-center mb-4">
              <BookOpen className="w-7 h-7 text-purple-400" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-3">Rich Resources</h3>
            <p className="text-slate-400">
              Access prerequisites, external learning materials, and discussion threads
              for every problem to deepen your understanding.
            </p>
          </div>
        </div>

        <div className="bg-gradient-to-r from-emerald-500/10 to-blue-500/10 rounded-2xl p-8 md:p-12 border border-emerald-500/20">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-3xl font-bold text-white mb-4">
                Why Choose CodeFocus?
              </h2>
              <p className="text-slate-300 mb-6">
                We've designed a distraction-free environment that helps you focus on what matters
                most: becoming a better programmer through consistent practice and deep learning.
              </p>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="bg-emerald-500/20 p-2 rounded-lg mt-1">
                    <Zap className="w-5 h-5 text-emerald-400" />
                  </div>
                  <div>
                    <h4 className="text-white font-semibold mb-1">Clean Interface</h4>
                    <p className="text-slate-400 text-sm">
                      Minimalist design that eliminates distractions and keeps you in the zone
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="bg-blue-500/20 p-2 rounded-lg mt-1">
                    <Users className="w-5 h-5 text-blue-400" />
                  </div>
                  <div>
                    <h4 className="text-white font-semibold mb-1">Community Driven</h4>
                    <p className="text-slate-400 text-sm">
                      Learn from discussions and solutions shared by fellow programmers
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="bg-purple-500/20 p-2 rounded-lg mt-1">
                    <TrendingUp className="w-5 h-5 text-purple-400" />
                  </div>
                  <div>
                    <h4 className="text-white font-semibold mb-1">Data-Driven Insights</h4>
                    <p className="text-slate-400 text-sm">
                      Comprehensive analytics to understand your progress and optimize learning
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="hidden md:block">
              <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Problems Solved</span>
                    <span className="text-2xl font-bold text-white">127</span>
                  </div>
                  <div className="w-full bg-slate-700 rounded-full h-2">
                    <div className="bg-emerald-500 h-2 rounded-full" style={{ width: '63%' }}></div>
                  </div>
                  <div className="grid grid-cols-3 gap-4 mt-6">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-400">42</div>
                      <div className="text-xs text-slate-400">Easy</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-yellow-400">65</div>
                      <div className="text-xs text-slate-400">Medium</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-red-400">20</div>
                      <div className="text-xs text-slate-400">Hard</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center mt-20">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to Get Started?</h2>
          <p className="text-slate-300 mb-8">Join thousands of developers improving their skills daily</p>
          <Link
            to="/problems"
            className="inline-block px-8 py-4 bg-emerald-500 text-white text-lg font-semibold rounded-xl hover:bg-emerald-600 transition-colors shadow-lg shadow-emerald-500/20"
          >
            Browse Problems
          </Link>
        </div>
      </div>
    </div>
  );
}
