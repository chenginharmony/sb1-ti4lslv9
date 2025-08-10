import React from 'react';
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  Zap, 
  Trophy,
  Search
} from 'lucide-react';

interface MobileNavProps {
  darkMode: boolean;
  activeSection: string;
  setActiveSection: (section: string) => void;
}

const MobileNav: React.FC<MobileNavProps> = ({ darkMode, activeSection, setActiveSection }) => {
  const navItems = [
    { id: 'overview', label: 'Overview', icon: BarChart3 },
    { id: 'creators', label: 'Creators', icon: Users },
    { id: 'zora', label: 'Zora', icon: Zap },
    { id: 'trending', label: 'Trending', icon: Trophy },
    { id: 'search', label: 'Search', icon: Search },
  ];

  return (
    <div className={`fixed bottom-0 left-0 right-0 ${
      darkMode 
        ? 'bg-slate-900/95 border-slate-800' 
        : 'bg-white/95 border-slate-200'
    } border-t backdrop-blur-lg z-50 md:hidden`}>
      <div className="flex items-center justify-around px-2 py-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeSection === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => setActiveSection(item.id)}
              className={`flex flex-col items-center space-y-1 px-3 py-2 rounded-lg transition-all duration-200 ${
                isActive
                  ? 'text-blue-500'
                  : darkMode
                    ? 'text-slate-400 hover:text-slate-300'
                    : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              <Icon className={`w-5 h-5 ${isActive ? 'scale-110' : ''} transition-transform`} />
              <span className="text-xs font-medium">{item.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default MobileNav;