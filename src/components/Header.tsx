import React from 'react';
import { Search, Moon, Sun, Bell, Menu } from 'lucide-react';

interface HeaderProps {
  darkMode: boolean;
  setDarkMode: (darkMode: boolean) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}

const Header: React.FC<HeaderProps> = ({ 
  darkMode, 
  setDarkMode, 
  searchQuery, 
  setSearchQuery,
  sidebarOpen,
  setSidebarOpen
}) => {
  return (
    <header className={`${
      darkMode 
        ? 'bg-slate-900/95 border-slate-800' 
        : 'bg-white/95 border-slate-200'
    } border-b backdrop-blur-lg sticky top-0 z-30`}>
      <div className="flex items-center justify-between px-4 md:px-6 py-3">
        {/* Mobile Menu Button */}
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className={`md:hidden p-2 rounded-lg ${
            darkMode 
              ? 'hover:bg-slate-800 text-slate-300' 
              : 'hover:bg-slate-100 text-slate-700'
          } transition-colors`}
        >
          <Menu className="w-5 h-5" />
        </button>

        {/* Search Bar */}
        <div className="flex-1 max-w-xl mx-3">
          <div className="relative">
            <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 ${
              darkMode ? 'text-slate-400' : 'text-slate-500'
            }`} />
            <input
              type="text"
              placeholder="Search creators, builders, influencers..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={`w-full pl-10 pr-4 py-2 rounded-lg border ${
                darkMode 
                  ? 'bg-slate-800 border-slate-700 text-white placeholder-slate-400 focus:border-blue-500' 
                  : 'bg-slate-50 border-slate-200 text-slate-900 placeholder-slate-500 focus:border-blue-500'
              } focus:ring-2 focus:ring-blue-500/20 focus:outline-none transition-all`}
            />
          </div>
        </div>

        {/* Right Actions */}
        <div className="flex items-center space-x-2">
          {/* Notifications */}
          <button className={`p-2 rounded-lg ${
            darkMode 
              ? 'hover:bg-slate-800 text-slate-300' 
              : 'hover:bg-slate-100 text-slate-700'
          } transition-colors relative`}>
            <Bell className="w-5 h-5" />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-blue-500 rounded-full"></span>
          </button>

          {/* Theme Toggle */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className={`p-2 rounded-lg ${
              darkMode 
                ? 'hover:bg-slate-800 text-slate-300' 
                : 'hover:bg-slate-100 text-slate-700'
            } transition-colors`}
          >
            {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>

          {/* Profile */}
          <div className="w-7 h-7 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full"></div>
        </div>
      </div>
    </header>
  );
};

export default Header;