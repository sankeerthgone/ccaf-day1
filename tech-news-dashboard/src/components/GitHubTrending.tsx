import React from 'react';
import { Star, GitFork, TrendingUp, ExternalLink } from 'lucide-react';
import type { GitHubTrendingRepo } from '../types/news';

interface GitHubTrendingProps {
  repos: GitHubTrendingRepo[];
  darkMode: boolean;
  loading: boolean;
}

/**
 * GITHUB TRENDING COMPONENT
 * 
 * Shows trending repositories with:
 * - Stars count
 * - Forks count
 * - Language badge
 * - Today's growth
 */
export const GitHubTrendingSection: React.FC<GitHubTrendingProps> = ({
  repos,
  darkMode,
  loading,
}) => {
  if (loading) {
    return (
      <div className={`rounded-lg p-6 ${
        darkMode ? 'bg-gray-800' : 'bg-white'
      } border ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
        <div className="h-6 w-40 bg-gray-300 animate-pulse rounded" />
      </div>
    );
  }

  return (
    <section className={`rounded-lg p-6 ${
      darkMode ? 'bg-gray-800' : 'bg-white'
    } border ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
      <h2 className={`text-2xl font-bold mb-6 flex items-center gap-2 ${
        darkMode ? 'text-white' : 'text-gray-900'
      }`}>
        <TrendingUp size={24} className="text-orange-500" />
        GitHub Trending
      </h2>

      <div className="space-y-4">
        {repos.map((repo, idx) => (
          <a
            key={repo.name}
            href={repo.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`block p-4 rounded-lg border transition-all ${
              darkMode
                ? 'bg-gray-900 border-gray-700 hover:border-orange-500'
                : 'bg-gray-50 border-gray-200 hover:border-orange-500'
            }`}
          >
            <div className="flex items-start justify-between gap-4">
              {/* Rank & Avatar */}
              <div className="flex items-center gap-3 flex-1">
                <div className={`text-lg font-bold ${
                  darkMode ? 'text-gray-500' : 'text-gray-400'
                }`}>
                  #{idx + 1}
                </div>
                <img
                  src={repo.avatar}
                  alt="Owner"
                  className="w-10 h-10 rounded-full"
                  onError={e => {
                    (e.target as HTMLImageElement).src = 'https://via.placeholder.com/40';
                  }}
                />
                <div className="flex-1 min-w-0">
                  <h3 className={`font-bold text-lg truncate ${
                    darkMode ? 'text-white' : 'text-gray-900'
                  }`}>
                    {repo.name}
                  </h3>
                  <p className={`text-sm line-clamp-1 ${
                    darkMode ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    {repo.description}
                  </p>
                </div>
              </div>

              {/* Link Icon */}
              <ExternalLink size={18} className={darkMode ? 'text-gray-500' : 'text-gray-400'} />
            </div>

            {/* Stats */}
            <div className="flex flex-wrap items-center gap-4 mt-3 text-sm">
              {/* Language */}
              {repo.language && (
                <div className="flex items-center gap-1">
                  <span className={`w-3 h-3 rounded-full ${
                    repo.language === 'TypeScript' ? 'bg-blue-500' :
                    repo.language === 'Python' ? 'bg-yellow-500' :
                    repo.language === 'Rust' ? 'bg-orange-500' :
                    repo.language === 'Go' ? 'bg-cyan-500' :
                    'bg-gray-500'
                  }`} />
                  <span className={darkMode ? 'text-gray-400' : 'text-gray-600'}>
                    {repo.language}
                  </span>
                </div>
              )}

              {/* Stars */}
              <div className={`flex items-center gap-1 ${
                darkMode ? 'text-gray-400' : 'text-gray-600'
              }`}>
                <Star size={16} />
                <span>{repo.stars.toLocaleString()}</span>
              </div>

              {/* Forks */}
              <div className={`flex items-center gap-1 ${
                darkMode ? 'text-gray-400' : 'text-gray-600'
              }`}>
                <GitFork size={16} />
                <span>{repo.forks.toLocaleString()}</span>
              </div>

              {/* Growth */}
              <div className="flex items-center gap-1 text-green-500 font-semibold">
                <TrendingUp size={16} />
                <span>+{repo.growthToday} today</span>
              </div>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
};
