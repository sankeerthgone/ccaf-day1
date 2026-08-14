import React from 'react';
import { Search, X } from 'lucide-react';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  darkMode: boolean;
  placeholder?: string;
}

/**
 * SEARCH BAR COMPONENT
 * 
 * Real-time search across headlines, descriptions
 */
export const SearchBar: React.FC<SearchBarProps> = ({
  value,
  onChange,
  darkMode,
  placeholder = 'Search news...',
}) => {
  return (
    <div className="relative">
      <Search
        size={20}
        className={`absolute left-3 top-3 ${
          darkMode ? 'text-gray-500' : 'text-gray-400'
        }`}
      />
      <input
        type="text"
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        className={`w-full pl-10 pr-10 py-2 rounded-lg border transition-all ${
          darkMode
            ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-500'
            : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400'
        } focus:outline-none focus:ring-2 focus:ring-purple-500`}
      />
      {value && (
        <button
          onClick={() => onChange('')}
          className={`absolute right-3 top-3 ${
            darkMode ? 'text-gray-500 hover:text-gray-300' : 'text-gray-400 hover:text-gray-600'
          }`}
        >
          <X size={20} />
        </button>
      )}
    </div>
  );
};

interface CategoryFilterProps {
  selectedCategory: string | null;
  onCategoryChange: (category: string | null) => void;
  darkMode: boolean;
}

const CATEGORIES = ['AI', 'Programming', 'Startups', 'Cybersecurity', 'Cloud', 'Mobile', 'Web Dev'];

/**
 * CATEGORY FILTER COMPONENT
 * 
 * Chips for instant category filtering
 */
export const CategoryFilter: React.FC<CategoryFilterProps> = ({
  selectedCategory,
  onCategoryChange,
  darkMode,
}) => {
  return (
    <div className="flex flex-wrap gap-2">
      {/* "All" button */}
      <button
        onClick={() => onCategoryChange(null)}
        className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
          selectedCategory === null
            ? 'bg-purple-600 text-white shadow-md'
            : darkMode
            ? 'bg-gray-800 text-gray-200 hover:bg-gray-700'
            : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
        }`}
      >
        All
      </button>

      {/* Category chips */}
      {CATEGORIES.map(category => (
        <button
          key={category}
          onClick={() => onCategoryChange(category)}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
            selectedCategory === category
              ? 'bg-purple-600 text-white shadow-md'
              : darkMode
              ? 'bg-gray-800 text-gray-200 hover:bg-gray-700'
              : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
          }`}
        >
          {category}
        </button>
      ))}
    </div>
  );
};
