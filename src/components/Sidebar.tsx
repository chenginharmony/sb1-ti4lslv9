import React from 'react';
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  Zap, 
  DollarSign, 
  Trophy, 
  Target, 
  Coins,
  Globe,
  Settings,
  User,
  ChevronDown,
  ChevronRight
} from 'lucide-react';

interface SidebarProps {
  darkMode: boolean;
  activeSection: string;
  setActiveSection: (section: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ darkMode, activeSection, setActiveSection }) => {
  const [creatorEconomyExpanded, setCreatorEconomyExpanded] = React.useState(true);

  const creatorEconomyItems = [
    { id: 'zora', label: 'Zora', icon: '🎨' },
    { id: 'base', label: 'Base', icon: '🔵' },
    { id: 'farcaster', label: 'Farcaster', icon: '🟣' },
    { id: 'clanker', label: 'Clanker', icon: '🤖' },
    { id: 'pumpfun', label: 'Pumpfun', icon: '🚀' },
  ];

  const menuItems = [
    { id: 'overview', label: 'Overview', icon: BarChart3, active: true },
    { id: 'creators', label: 'Creators', icon: Users },
    { id: 'builders', label: 'Builders', icon: Zap },
    { id: 'influencers', label: 'Influencers', icon: TrendingUp },
    { id: 'trending', label: 'Trending', icon: Trophy },
    { id: 'campaigns', label: 'Campaigns', icon: Target },
    { id: 'funding', label: 'Funding', icon: DollarSign },
    { id: 'tokens', label: 'Creator Tokens', icon: Coins },
    { id: 'platforms', label: 'Platforms', icon: Globe },
  ];

  const bottomItems = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <div className={`fixed left-0 top-0 h-full w-64 ${
      darkMode 
        ? 'bg-slate-900 border-slate-800' 
        : 'bg-white border-slate-200'
    } border-r flex flex-col z-40`}>
      {/* Logo */}
      <div className="p-4 border-b border-slate-800">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
            <BarChart3 className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className={`text-lg font-bold ${darkMode ? 'text-white' : 'text-slate-900'}`}>
              CreatorLlama
            </h1>
            <p className={`text-xs ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
              Analytics
            </p>
          </div>
        </div>
      </div>

      {/* Dashboards Section */}
      <div className="px-4 py-3">
        <div className="flex items-center justify-between mb-2">
          <span className={`text-xs font-semibold uppercase tracking-wider ${
            darkMode ? 'text-slate-400' : 'text-slate-500'
          }`}>
            Dashboards
          </span>
        </div>
        
        {/* Creator Economy Dropdown */}
        <div className="mb-3">
          <button 
            onClick={() => setCreatorEconomyExpanded(!creatorEconomyExpanded)}
            className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm font-medium ${
            darkMode 
              ? 'text-slate-300 hover:bg-slate-800' 
              : 'text-slate-700 hover:bg-slate-100'
          } transition-colors`}>
            <div className="flex items-center space-x-3">
              <BarChart3 className="w-4 h-4" />
              <span>Creator Economy</span>
            </div>
            {creatorEconomyExpanded ? (
              <ChevronDown className="w-4 h-4" />
            ) : (
              <ChevronRight className="w-4 h-4" />
            )}
          </button>
          
          {/* Creator Economy Submenu */}
          {creatorEconomyExpanded && (
            <div className="mt-1 ml-4 space-y-0.5">
              {creatorEconomyItems.map((item) => {
                const isActive = activeSection === item.id;
                
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveSection(item.id)}
                    className={`w-full flex items-center space-x-2 px-2 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                      isActive
                        ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/25'
                        : darkMode
                          ? 'text-slate-400 hover:bg-slate-800 hover:text-white'
                          : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                    }`}
                  >
                    <span className="text-sm">{item.icon}</span>
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Main Navigation */}
      <nav className="flex-1 px-4 space-y-0.5">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeSection === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => setActiveSection(item.id)}
              className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                isActive
                  ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/25'
                  : darkMode
                    ? 'text-slate-300 hover:bg-slate-800 hover:text-white'
                    : 'text-slate-700 hover:bg-slate-100 hover:text-slate-900'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>

      {/* Bottom Section */}
      <div className="p-3 border-t border-slate-800 space-y-0.5">
        {bottomItems.map((item) => {
          const Icon = item.icon;
          
          return (
            <button
              key={item.id}
              onClick={() => setActiveSection(item.id)}
              className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                darkMode
                  ? 'text-slate-300 hover:bg-slate-800 hover:text-white'
                  : 'text-slate-700 hover:bg-slate-100 hover:text-slate-900'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{item.label}</span>
            </button>
          );
        })}
        
        {/* Sign In Button */}
        <button className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium mt-3 ${
          darkMode
            ? 'bg-slate-800 text-blue-400 hover:bg-slate-700'
            : 'bg-slate-100 text-blue-600 hover:bg-slate-200'
        } transition-colors`}>
          <User className="w-4 h-4" />
          <span>Sign In / Subscribe</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;