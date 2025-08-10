import React, { useState } from 'react';
import { TrendingUp, Users, DollarSign, Zap, Twitter, Github, Globe, Activity, Coins } from 'lucide-react';
import Sidebar from './components/Sidebar';
import MobileNav from './components/MobileNav';
import Header from './components/Header';

interface Creator {
  id: number;
  name: string;
  handle: string;
  avatar: string;
  type: 'Creator' | 'Builder' | 'Influencer';
  category: string;
  platforms: string[];
  totalFollowers: number;
  weeklyGrowth: number;
  engagementRate: number;
  projects: number;
  funding: number;
  tokens: number;
  verified: boolean;
  tvl?: number;
}

interface MetricCardProps {
  title: string;
  value: string;
  change: string;
  icon: React.ReactNode;
  positive?: boolean;
}

const MetricCard: React.FC<MetricCardProps> = ({ title, value, change, icon, positive = true }) => (
  <div className="bg-gradient-to-br from-slate-50 to-white dark:from-slate-800 dark:to-slate-900 rounded-xl p-4 border border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 transition-all duration-300 hover:shadow-lg dark:hover:shadow-slate-900/20">
    <div className="flex items-center justify-between">
      <div className="flex-1">
        <p className="text-slate-600 dark:text-slate-400 text-sm font-medium mb-1">{title}</p>
        <p className="text-xl font-bold text-slate-900 dark:text-white mb-1">{value}</p>
        <div className={`flex items-center text-sm font-medium ${
          positive ? 'text-emerald-600 dark:text-emerald-400' : 'text-red-600 dark:text-red-400'
        }`}>
          <TrendingUp className="w-4 h-4 mr-1" />
          {change}
        </div>
      </div>
      <div className="text-blue-500 dark:text-blue-400 bg-blue-50 dark:bg-blue-500/10 p-2.5 rounded-lg">
        {icon}
      </div>
    </div>
  </div>
);

const mockCreators: Creator[] = [
  {
    id: 1,
    name: "Vitalik Buterin",
    handle: "@VitalikButerin",
    avatar: "https://images.pexels.com/photos/3184433/pexels-photo-3184433.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop",
    type: "Builder",
    category: "DeFi",
    platforms: ["Twitter", "GitHub", "Farcaster"],
    totalFollowers: 5200000,
    weeklyGrowth: 2.4,
    engagementRate: 4.2,
    projects: 8,
    funding: 25000000,
    tokens: 3,
    verified: true,
    tvl: 45000000000
  },
  {
    id: 2,
    name: "Punk6529",
    handle: "@punk6529",
    avatar: "https://images.pexels.com/photos/3756679/pexels-photo-3756679.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop",
    type: "Creator",
    category: "NFTs",
    platforms: ["Twitter", "Zora", "Foundation"],
    totalFollowers: 1800000,
    weeklyGrowth: 5.7,
    engagementRate: 6.8,
    projects: 15,
    funding: 8500000,
    tokens: 12,
    verified: true
  },
  {
    id: 3,
    name: "Balaji Srinivasan",
    handle: "@balajis",
    avatar: "https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop",
    type: "Influencer",
    category: "Tech",
    platforms: ["Twitter", "Mirror", "GitHub"],
    totalFollowers: 980000,
    weeklyGrowth: 3.2,
    engagementRate: 5.4,
    projects: 22,
    funding: 12000000,
    tokens: 5,
    verified: true
  },
  {
    id: 4,
    name: "Linda Xie",
    handle: "@ljxie",
    avatar: "https://images.pexels.com/photos/3769021/pexels-photo-3769021.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop",
    type: "Builder",
    category: "DeFi",
    platforms: ["Twitter", "Mirror", "Lens"],
    totalFollowers: 420000,
    weeklyGrowth: 4.1,
    engagementRate: 7.2,
    projects: 6,
    funding: 5200000,
    tokens: 2,
    verified: true
  },
  {
    id: 5,
    name: "Packy McCormick",
    handle: "@packyM",
    avatar: "https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop",
    type: "Creator",
    category: "Education",
    platforms: ["Twitter", "Substack", "Mirror"],
    totalFollowers: 680000,
    weeklyGrowth: 6.3,
    engagementRate: 8.1,
    projects: 4,
    funding: 3800000,
    tokens: 1,
    verified: true
  }
];

function App() {
  const [darkMode, setDarkMode] = useState(true);
  const [activeSection, setActiveSection] = useState('overview');
  const [selectedType, setSelectedType] = useState<string>('All');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<string>('totalFollowers');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const filteredCreators = mockCreators.filter(creator => {
    const matchesType = selectedType === 'All' || creator.type === selectedType;
    const matchesCategory = selectedCategory === 'All' || creator.category === selectedCategory;
    const matchesSearch = creator.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         creator.handle.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesType && matchesCategory && matchesSearch;
  }).sort((a, b) => {
    const aVal = a[sortBy as keyof Creator] as number;
    const bVal = b[sortBy as keyof Creator] as number;
    return sortOrder === 'desc' ? bVal - aVal : aVal - bVal;
  });

  const formatNumber = (num: number) => {
    if (num >= 1e9) return `$${(num / 1e9).toFixed(1)}B`;
    if (num >= 1e6) return `$${(num / 1e6).toFixed(1)}M`;
    if (num >= 1e3) return `$${(num / 1e3).toFixed(1)}K`;
    return num.toString();
  };

  const formatFollowers = (num: number) => {
    if (num >= 1e6) return `${(num / 1e6).toFixed(1)}M`;
    if (num >= 1e3) return `${(num / 1e3).toFixed(0)}K`;
    return num.toString();
  };

  const getPlatformIcon = (platform: string) => {
    switch (platform) {
      case 'Twitter': return <Twitter className="w-4 h-4" />;
      case 'GitHub': return <Github className="w-4 h-4" />;
      default: return <Globe className="w-4 h-4" />;
    }
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      darkMode 
        ? 'bg-slate-950 text-white' 
        : 'bg-slate-50 text-slate-900'
    }`}>
      {/* Desktop Sidebar */}
      <div className="hidden md:block">
        <Sidebar 
          darkMode={darkMode} 
          activeSection={activeSection} 
          setActiveSection={setActiveSection} 
        />
      </div>

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div className="md:hidden fixed inset-0 z-50">
          <div 
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setSidebarOpen(false)}
          />
          <div className="relative">
            <Sidebar 
              darkMode={darkMode} 
              activeSection={activeSection} 
              setActiveSection={setActiveSection} 
            />
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="md:ml-64 min-h-screen flex flex-col">
        {/* Header */}
        <Header 
          darkMode={darkMode}
          setDarkMode={setDarkMode}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
        />

        {/* Content */}
        <main className="flex-1 p-3 md:p-4 pb-20 md:pb-4">
          {/* Page Title */}
          <div className="mb-6">
            {activeSection === 'overview' && (
              <>
                <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-1">
                  Creator Economy Overview
                </h1>
                <p className="text-slate-600 dark:text-slate-400">
                  Track and analyze the top creators, builders, and influencers across Web3 and Web2 platforms
                </p>
              </>
            )}
            {activeSection === 'zora' && (
              <>
                <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-1">
                  🎨 Zora Analytics
                </h1>
                <p className="text-slate-600 dark:text-slate-400">
                  Track NFT creators, mints, and creator coins on Zora protocol
                </p>
              </>
            )}
            {activeSection === 'base' && (
              <>
                <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-1">
                  🔵 Base Ecosystem
                </h1>
                <p className="text-slate-600 dark:text-slate-400">
                  Discover builders and projects on Base L2 network
                </p>
              </>
            )}
            {activeSection === 'farcaster' && (
              <>
                <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-1">
                  🟣 Farcaster Network
                </h1>
                <p className="text-slate-600 dark:text-slate-400">
                  Analyze casters, channels, and engagement on Farcaster protocol
                </p>
              </>
            )}
            {activeSection === 'clanker' && (
              <>
                <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-1">
                  🤖 Clanker Tokens
                </h1>
                <p className="text-slate-600 dark:text-slate-400">
                  Track token launches and performance on Clanker platform
                </p>
              </>
            )}
            {activeSection === 'pumpfun' && (
              <>
                <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-1">
                  🚀 Pumpfun Ecosystem
                </h1>
                <p className="text-slate-600 dark:text-slate-400">
                  Monitor meme coin launches and trading activity on Pumpfun
                </p>
              </>
            )}
          </div>

          {/* Metrics Overview */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <MetricCard
              title="Total Creators"
              value="12.4K"
              change="+8.2%"
              icon={<Users className="w-6 h-6" />}
            />
            <MetricCard
              title="Total Funding"
              value="$2.1B"
              change="+15.7%"
              icon={<DollarSign className="w-6 h-6" />}
            />
            <MetricCard
              title="Active Projects"
              value="3.2K"
              change="+12.3%"
              icon={<Zap className="w-6 h-6" />}
            />
            <MetricCard
              title="Creator Tokens"
              value="847"
              change="+24.5%"
              icon={<Coins className="w-6 h-6" />}
            />
          </div>

          {/* Filters */}
          <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700 p-4 mb-6 shadow-sm">
            <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center">
              <div className="flex flex-col sm:flex-row gap-3 flex-1">
                <select
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                  className="px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                >
                  <option value="All">All Types</option>
                  <option value="Creator">Creator</option>
                  <option value="Builder">Builder</option>
                  <option value="Influencer">Influencer</option>
                </select>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                >
                  <option value="All">All Categories</option>
                  <option value="DeFi">DeFi</option>
                  <option value="NFTs">NFTs</option>
                  <option value="Tech">Tech</option>
                  <option value="Education">Education</option>
                </select>
              </div>
              <div className="text-sm text-slate-600 dark:text-slate-400">
                Showing {filteredCreators.length} results
              </div>
            </div>
          </div>

          {/* Creator Rankings Table */}
          <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden shadow-sm">
            <div className="px-4 py-3 border-b border-slate-200 dark:border-slate-700">
              <h2 className="text-lg font-bold flex items-center text-slate-900 dark:text-white">
                <Activity className="w-5 h-5 mr-2 text-blue-500" />
                Creator Rankings
              </h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-50 dark:bg-slate-800/50">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider">#</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider">Creator</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider">Type</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider">Platforms</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider">Followers</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider">7d Growth</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider">Engagement</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider">Projects</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider">Funding</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider">Tokens</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                  {filteredCreators.map((creator, index) => (
                    <tr key={creator.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors cursor-pointer">
                      <td className="px-4 py-3 whitespace-nowrap text-sm font-semibold text-slate-900 dark:text-white">
                        {index + 1}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <div className="flex items-center">
                          <img 
                            className="h-8 w-8 rounded-full object-cover ring-2 ring-slate-200 dark:ring-slate-700" 
                            src={creator.avatar} 
                            alt={creator.name}
                          />
                          <div className="ml-3">
                            <div className="text-sm font-semibold text-slate-900 dark:text-white flex items-center">
                              {creator.name}
                              {creator.verified && <span className="ml-1 text-blue-500">✓</span>}
                            </div>
                            <div className="text-xs text-slate-500 dark:text-slate-400">
                              {creator.handle}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <span className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full ${
                          creator.type === 'Creator' ? 'bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300' :
                          creator.type === 'Builder' ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300' :
                          'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-800 dark:text-emerald-300'
                        }`}>
                          {creator.type}
                        </span>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <div className="flex space-x-2">
                          {creator.platforms.slice(0, 3).map((platform, i) => (
                            <span key={i} className="text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300 transition-colors">
                              {getPlatformIcon(platform)}
                            </span>
                          ))}
                          {creator.platforms.length > 3 && (
                            <span className="text-xs text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded-full">
                              +{creator.platforms.length - 3}
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm font-semibold text-slate-900 dark:text-white">
                        {formatFollowers(creator.totalFollowers)}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <span className={`text-sm font-semibold ${
                          creator.weeklyGrowth > 0 ? 'text-emerald-600 dark:text-emerald-400' : 'text-red-600 dark:text-red-400'
                        }`}>
                          {creator.weeklyGrowth > 0 ? '+' : ''}{creator.weeklyGrowth}%
                        </span>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-slate-900 dark:text-white">
                        {creator.engagementRate}%
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-slate-900 dark:text-white">
                        {creator.projects}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm font-semibold text-slate-900 dark:text-white">
                        {formatNumber(creator.funding)}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-slate-900 dark:text-white">
                        {creator.tokens}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>

      {/* Mobile Navigation */}
      <MobileNav 
        darkMode={darkMode} 
        activeSection={activeSection} 
        setActiveSection={setActiveSection} 
      />
    </div>
  );
}

export default App;