import { useState } from 'react';
import { Header } from './components/Header';
import { SearchBar, CategoryFilter } from './components/SearchBar';
import { NewsCard, SkeletonLoader } from './components/NewsCard';
import { GitHubTrendingSection } from './components/GitHubTrending';
import { useNews } from './hooks/useNews';

/**
 * APP COMPONENT - Main Container
 * 
 * Flow:
 * 1. useNews hook loads data on mount
 * 2. User interacts (search, filter, bookmark)
 * 3. State updates → components re-render
 * 4. LocalStorage syncs automatically
 */
export function App() {
  const {
    // Data
    news,
    githubTrending,
    bookmarks,

    // State
    selectedCategory,
    searchQuery,
    darkMode,
    loading,
    error,
    lastUpdated,

    // Actions
    setSelectedCategory,
    setSearchQuery,
    setDarkMode,
    toggleBookmark,
    isBookmarked,
    refreshNews,
  } = useNews();

  const [showBookmarks, setShowBookmarks] = useState(false);

  return (
    <div className={darkMode ? 'dark' : ''}>
      <div className={`min-h-screen transition-colors ${
        darkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'
      }`}>
        {/* HEADER */}
        <Header
          darkMode={darkMode}
          onDarkModeToggle={setDarkMode}
          bookmarkCount={bookmarks.length}
          onBookmarksClick={() => setShowBookmarks(!showBookmarks)}
          lastUpdated={lastUpdated}
          onRefresh={refreshNews}
          loading={loading}
        />

        {/* MAIN CONTENT */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* ERROR BANNER */}
          {error && (
            <div className="mb-6 p-4 bg-red-500 bg-opacity-20 border border-red-500 text-red-500 rounded-lg">
              {error}
            </div>
          )}

          {/* SEARCH & FILTERS */}
          <div className="mb-8 space-y-4">
            <SearchBar
              value={searchQuery}
              onChange={setSearchQuery}
              darkMode={darkMode}
            />
            <CategoryFilter
              selectedCategory={selectedCategory}
              onCategoryChange={setSelectedCategory}
              darkMode={darkMode}
            />
          </div>

          {/* BOOKMARKS PANEL */}
          {showBookmarks && (
            <section className={`mb-8 rounded-lg p-6 ${
              darkMode ? 'bg-gray-800' : 'bg-white'
            } border ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
              <h2 className="text-2xl font-bold mb-6">
                My Bookmarks ({bookmarks.length})
              </h2>

              {bookmarks.length === 0 ? (
                <p className={darkMode ? 'text-gray-400' : 'text-gray-600'}>
                  No bookmarks yet. Click the bookmark icon on any article to save it.
                </p>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {bookmarks.map(bookmark => (
                    <NewsCard
                      key={bookmark.id}
                      news={bookmark}
                      darkMode={darkMode}
                      isBookmarked={true}
                      onBookmarkToggle={() => toggleBookmark(bookmark)}
                    />
                  ))}
                </div>
              )}
            </section>
          )}

          {/* GITHUB TRENDING SECTION */}
          <div className="mb-12">
            <GitHubTrendingSection
              repos={githubTrending}
              darkMode={darkMode}
              loading={loading}
            />
          </div>

          {/* TRENDING NEWS SECTION */}
          <section>
            <h2 className="text-3xl font-bold mb-8 flex items-center gap-2">
              <span>📰</span>
              {selectedCategory || 'All News'}
            </h2>

            {loading ? (
              <SkeletonLoader darkMode={darkMode} count={6} />
            ) : news.length === 0 ? (
              <div className={`text-center py-12 rounded-lg border ${
                darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
              }`}>
                <p className={`text-xl ${
                  darkMode ? 'text-gray-400' : 'text-gray-600'
                }`}>
                  No articles found.{' '}
                  {searchQuery && 'Try a different search term.'}
                  {selectedCategory && 'Try selecting a different category.'}
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {news.map(item => (
                  <NewsCard
                    key={item.id}
                    news={item}
                    darkMode={darkMode}
                    isBookmarked={isBookmarked(item.id)}
                    onBookmarkToggle={() => toggleBookmark(item)}
                  />
                ))}
              </div>
            )}
          </section>

          {/* FOOTER */}
          <footer className={`mt-16 py-8 border-t ${
            darkMode ? 'border-gray-800 text-gray-400' : 'border-gray-200 text-gray-600'
          }`}>
            <div className="text-center space-y-2">
              <p>
                News aggregated from{' '}
                <span className="font-semibold">Hacker News</span>,{' '}
                <span className="font-semibold">GitHub Trending</span>,{' '}
                <span className="font-semibold">TechCrunch</span>, and{' '}
                <span className="font-semibold">Ars Technica</span>
              </p>
              <p className="text-sm">
                Built with React, Tailwind CSS, TypeScript & Fetch API
              </p>
              <p className="text-xs opacity-60">
                Data updates every 10 minutes • No login required • All data is public
              </p>
            </div>
          </footer>
        </main>
      </div>
    </div>
  );
}

export default App;
