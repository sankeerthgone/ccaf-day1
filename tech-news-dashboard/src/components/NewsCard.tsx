import React from 'react';
import { Bookmark, ExternalLink } from 'lucide-react';
import type { NewsItem } from '../types/news';

interface NewsCardProps {
  news: NewsItem;
  darkMode: boolean;
  isBookmarked: boolean;
  onBookmarkToggle: () => void;
}

/**
 * NEWS CARD COMPONENT
 * 
 * Displays one news article with:
 * - Thumbnail
 * - Headline
 * - Source & category badge
 * - Publish time
 * - Bookmark button
 */
export const NewsCard: React.FC<NewsCardProps> = ({
  news,
  darkMode,
  isBookmarked,
  onBookmarkToggle,
}) => {
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    const now = new Date();
    const diff = now.getTime() - date.getTime();

    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    if (days < 7) return `${days}d ago`;

    return date.toLocaleDateString();
  };

  return (
    <article
      className={`rounded-lg overflow-hidden border transition-all hover:shadow-lg ${
        darkMode
          ? 'bg-gray-800 border-gray-700 hover:border-gray-600'
          : 'bg-white border-gray-200 hover:border-gray-300'
      }`}
    >
      {/* Thumbnail */}
      {news.thumbnail && (
        <div className="w-full h-48 bg-gray-300 overflow-hidden">
          <img
            src={news.thumbnail}
            alt={news.title}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
            onError={e => {
              (e.target as HTMLImageElement).style.display = 'none';
            }}
          />
        </div>
      )}

      {/* Content */}
      <div className="p-4">
        {/* Category & Source */}
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            {news.category && (
              <span className="px-2 py-1 text-xs font-semibold rounded-full bg-purple-500 text-white">
                {news.category}
              </span>
            )}
            <span className={`text-xs font-medium ${
              darkMode ? 'text-gray-400' : 'text-gray-600'
            }`}>
              {news.source}
            </span>
          </div>

          {/* Bookmark Button */}
          <button
            onClick={onBookmarkToggle}
            className={`p-2 rounded-lg transition-all ${
              isBookmarked
                ? 'text-red-500 bg-red-500 bg-opacity-10'
                : darkMode
                ? 'text-gray-400 hover:text-red-500 hover:bg-red-500 hover:bg-opacity-10'
                : 'text-gray-500 hover:text-red-500 hover:bg-red-500 hover:bg-opacity-10'
            }`}
          >
            {isBookmarked ? (
              <Bookmark size={18} />
            ) : (
              <Bookmark size={18} />
            )}
          </button>
        </div>

        {/* Title */}
        <a
          href={news.url}
          target="_blank"
          rel="noopener noreferrer"
          className={`text-lg font-bold line-clamp-2 hover:text-purple-500 transition-colors ${
            darkMode ? 'text-white' : 'text-gray-900'
          }`}
        >
          {news.title}
        </a>

        {/* Description */}
        {news.description && (
          <p className={`text-sm line-clamp-2 mt-2 ${
            darkMode ? 'text-gray-400' : 'text-gray-600'
          }`}>
            {news.description}
          </p>
        )}

        {/* Footer */}
        <div className="flex items-center justify-between mt-4 text-xs">
          <span className={darkMode ? 'text-gray-500' : 'text-gray-500'}>
            {formatDate(news.publishedAt)} • {news.readingTime || '3 min read'}
          </span>
          <a
            href={news.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-purple-500 hover:text-purple-600 font-medium"
          >
            Read <ExternalLink size={14} />
          </a>
        </div>
      </div>
    </article>
  );
};

interface SkeletonLoaderProps {
  darkMode: boolean;
  count?: number;
}

/**
 * SKELETON LOADER COMPONENT
 * 
 * Shows loading placeholders while fetching data
 * Better UX than spinners
 */
export const SkeletonLoader: React.FC<SkeletonLoaderProps> = ({
  darkMode,
  count = 6,
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array(count)
        .fill(0)
        .map((_, i) => (
          <div
            key={i}
            className={`rounded-lg overflow-hidden ${
              darkMode ? 'bg-gray-800' : 'bg-white'
            } border ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}
          >
            {/* Thumbnail skeleton */}
            <div
              className={`w-full h-48 ${
                darkMode ? 'bg-gray-700' : 'bg-gray-200'
              } animate-pulse`}
            />

            {/* Content skeleton */}
            <div className="p-4 space-y-3">
              <div className={`h-4 ${
                darkMode ? 'bg-gray-700' : 'bg-gray-200'
              } animate-pulse`} />
              <div className={`h-6 ${
                darkMode ? 'bg-gray-700' : 'bg-gray-200'
              } animate-pulse`} />
              <div className={`h-4 ${
                darkMode ? 'bg-gray-700' : 'bg-gray-200'
              } animate-pulse w-2/3`} />
              <div className={`h-3 ${
                darkMode ? 'bg-gray-700' : 'bg-gray-200'
              } animate-pulse`} />
            </div>
          </div>
        ))}
    </div>
  );
};
