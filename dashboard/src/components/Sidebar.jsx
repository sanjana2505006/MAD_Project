import React from 'react';
import { 
  Home, 
  BookOpen, 
  TrendingUp, 
  MessageCircle, 
  Settings,
  Code2,
  Zap,
  Database,
  Brain
} from 'lucide-react';

function Sidebar({ isOpen, currentPage, onPageChange, selectedCategory, onCategoryChange }) {
  const categories = [
    { id: 'arrays', label: 'Arrays', icon: Database },
    { id: 'strings', label: 'Strings', icon: Code2 },
    { id: 'algorithms', label: 'Algorithms', icon: Brain },
    { id: 'dynamic', label: 'Dynamic Programming', icon: Zap },
  ];

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'problems', label: 'Problems', icon: BookOpen },
    { id: 'progress', label: 'Progress', icon: TrendingUp },
    { id: 'forum', label: 'Discussions', icon: MessageCircle },
  ];

  return (
    <aside className={`sidebar ${isOpen ? 'open' : 'closed'}`}>
      <div className="sidebar-header">
        <div className="logo">
          <Code2 size={32} />
          {isOpen && <span className="logo-text">CodeMaster</span>}
        </div>
      </div>

      {isOpen && (
        <>
          <nav className="nav-menu">
            <div className="menu-section">
              <h3 className="section-title">Main</h3>
              {menuItems.map(item => (
                <button
                  key={item.id}
                  className={`nav-item ${currentPage === item.id ? 'active' : ''}`}
                  onClick={() => onPageChange(item.id)}
                  title={item.label}
                >
                  <item.icon size={20} />
                  <span>{item.label}</span>
                </button>
              ))}
            </div>

            <div className="menu-section">
              <h3 className="section-title">Categories</h3>
              {categories.map(cat => (
                <button
                  key={cat.id}
                  className={`nav-item ${selectedCategory === cat.id ? 'active' : ''}`}
                  onClick={() => onCategoryChange(cat.id)}
                  title={cat.label}
                >
                  <cat.icon size={18} />
                  <span>{cat.label}</span>
                </button>
              ))}
            </div>

            <div className="menu-section">
              <button className="nav-item" title="Settings">
                <Settings size={20} />
                <span>Settings</span>
              </button>
            </div>
          </nav>
        </>
      )}
    </aside>
  );
}

export default Sidebar;
