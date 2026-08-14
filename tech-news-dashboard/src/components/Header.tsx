import React from 'react';
import { Sun, Moon, Bookmark, RefreshCw } from 'lucide-react';

interface HeaderProps {
  darkMode: boolean;
  onDarkModeToggle: (value: boolean) => void;
  bookmarkCount: number;
  onBookmarksClick: () => void;
  lastUpdated: string;
  onRefresh: () => void;
  loading: boolean;
}

/**
 * HEADER COMPONENT
 * 
 * Displays:
 * - Logo & title
 * - Dark/light mode toggle
 * - Bookmarks count
 * - Last updated time
 * - Refresh button
 */
export const Header: React.FC<HeaderProps> = ({
  darkMode,
  onDarkModeToggle,
  bookmarkCount,
  onBookmarksClick,
  lastUpdated,
  onRefresh,
  loading,
}) => {
  return (
    <header className={`${
      darkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'
    } border-b ${
      darkMode ? 'border-gray-800' : 'border-gray-200'
    } sticky top-0 z-50 shadow-md`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          {/* Logo & Title */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center text-white font-bold">
              📰
            </div>
            <div>
              <h1 className="text-2xl font-bold">TechNews Hub</h1>
              <p className="text-xs opacity-60">Global Tech News Aggregator</p>
            </div>
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-4">
            {/* Last Updated */}
            <div className="hidden sm:flex flex-col text-right text-sm">
              <span className="opacity-60">Updated</span>
              <span className="font-mono text-xs">{lastUpdated}</span>
            </div>

            {/* Refresh Button */}
            <button
              onClick={onRefresh}
              disabled={loading}
              className={`p-2 rounded-lg transition-all ${
                loading ? 'animate-spin' : 'hover:bg-opacity-20'
              } ${
                darkMode
                  ? 'hover:bg-white hover:bg-opacity-10'
                  : 'hover:bg-gray-900 hover:bg-opacity-10'
              }`}
              title="Refresh news"
            >
              <RefreshCw size={20} />
            </button>

            {/* Bookmarks */}
            <button
              onClick={onBookmarksClick}
              className={`relative p-2 rounded-lg transition-all ${
                darkMode
                  ? 'hover:bg-white hover:bg-opacity-10'
                  : 'hover:bg-gray-900 hover:bg-opacity-10'
              }`}
              title="View bookmarks"
            >
              <Bookmark size={20} />
              {bookmarkCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {bookmarkCount > 99 ? '99+' : bookmarkCount}
                </span>
              )}
            </button>

            {/* Dark Mode Toggle */}
            <button
              onClick={() => onDarkModeToggle(!darkMode)}
              className={`p-2 rounded-lg transition-all ${
                darkMode
                  ? 'hover:bg-white hover:bg-opacity-10'
                  : 'hover:bg-gray-900 hover:bg-opacity-10'
              }`}
              title={darkMode ? 'Light mode' : 'Dark mode'}
            >
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
