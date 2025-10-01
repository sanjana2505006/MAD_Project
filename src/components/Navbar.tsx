import { Link, useLocation } from 'react-router-dom';
import { Code2, BarChart3, User, Home } from 'lucide-react';

export default function Navbar() {
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <nav className="bg-slate-900 border-b border-slate-800 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-8">
            <Link to="/" className="flex items-center space-x-2 text-white font-bold text-xl">
              <Code2 className="w-7 h-7 text-emerald-400" />
              <span>CodeFocus</span>
            </Link>

            <div className="hidden md:flex items-center space-x-1">
              <Link
                to="/"
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                  isActive('/')
                    ? 'bg-slate-800 text-white'
                    : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                }`}
              >
                <Home className="w-4 h-4" />
                <span>Home</span>
              </Link>

              <Link
                to="/problems"
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                  isActive('/problems') || location.pathname.startsWith('/problem/')
                    ? 'bg-slate-800 text-white'
                    : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                }`}
              >
                <Code2 className="w-4 h-4" />
                <span>Problems</span>
              </Link>

              <Link
                to="/analytics"
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                  isActive('/analytics')
                    ? 'bg-slate-800 text-white'
                    : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                }`}
              >
                <BarChart3 className="w-4 h-4" />
                <span>Analytics</span>
              </Link>

              <Link
                to="/dashboard"
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                  isActive('/dashboard')
                    ? 'bg-slate-800 text-white'
                    : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                }`}
              >
                <User className="w-4 h-4" />
                <span>Dashboard</span>
              </Link>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <button className="hidden sm:block px-4 py-2 text-sm font-medium text-slate-300 hover:text-white transition-colors">
              Sign In
            </button>
            <button className="px-4 py-2 text-sm font-medium bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors">
              Sign Up
            </button>
          </div>
        </div>
      </div>

      <div className="md:hidden border-t border-slate-800">
        <div className="flex items-center justify-around py-2">
          <Link
            to="/"
            className={`flex flex-col items-center space-y-1 px-3 py-2 rounded-lg ${
              isActive('/') ? 'text-emerald-400' : 'text-slate-400'
            }`}
          >
            <Home className="w-5 h-5" />
            <span className="text-xs">Home</span>
          </Link>

          <Link
            to="/problems"
            className={`flex flex-col items-center space-y-1 px-3 py-2 rounded-lg ${
              isActive('/problems') || location.pathname.startsWith('/problem/') ? 'text-emerald-400' : 'text-slate-400'
            }`}
          >
            <Code2 className="w-5 h-5" />
            <span className="text-xs">Problems</span>
          </Link>

          <Link
            to="/analytics"
            className={`flex flex-col items-center space-y-1 px-3 py-2 rounded-lg ${
              isActive('/analytics') ? 'text-emerald-400' : 'text-slate-400'
            }`}
          >
            <BarChart3 className="w-5 h-5" />
            <span className="text-xs">Analytics</span>
          </Link>

          <Link
            to="/dashboard"
            className={`flex flex-col items-center space-y-1 px-3 py-2 rounded-lg ${
              isActive('/dashboard') ? 'text-emerald-400' : 'text-slate-400'
            }`}
          >
            <User className="w-5 h-5" />
            <span className="text-xs">Dashboard</span>
          </Link>
        </div>
      </div>
    </nav>
  );
}
