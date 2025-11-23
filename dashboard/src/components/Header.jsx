import React from 'react';
import { Menu, Bell, User, Search } from 'lucide-react';

function Header({ onToggleSidebar }) {
  return (
    <header className="header">
      <div className="header-left">
        <button className="toggle-btn" onClick={onToggleSidebar}>
          <Menu size={24} />
        </button>
        <h1 className="header-title">Code Practice Dashboard</h1>
      </div>
      
      <div className="header-right">
        <div className="search-box">
          <Search size={18} />
          <input 
            type="text" 
            placeholder="Search questions..." 
            className="search-input"
          />
        </div>
        
        <div className="header-icons">
          <button className="icon-btn" title="Notifications">
            <Bell size={20} />
            <span className="notification-badge">3</span>
          </button>
          <button className="icon-btn profile-btn" title="Profile">
            <User size={20} />
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;
