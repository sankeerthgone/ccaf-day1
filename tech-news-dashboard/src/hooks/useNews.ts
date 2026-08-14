import { useState, useEffect } from 'react';
import type { NewsItem, GitHubTrendingRepo, Bookmark } from '../types/news';
import { fetchAllNews, filterNewsByCategory, searchNews } from '../services/newsApi';

/**
 * CUSTOM HOOK: useNews
 * 
 * Manages all news data, filtering, searching, and bookmarks
 * This keeps business logic separate from UI components
 */
export function useNews() {
  // ===== STATE =====
  const [allNews, setAllNews] = useState<NewsItem[]>([]);
  const [filteredNews, setFilteredNews] = useState<NewsItem[]>([]);
  const [githubTrending, setGithubTrending] = useState<GitHubTrendingRepo[]>([]);
  
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);
  const [darkMode, setDarkMode] = useState(false);
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<string>('');

  // ===== LOAD INITIAL DATA =====
  useEffect(() => {
    const loadNews = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const { news, github } = await fetchAllNews();
        setAllNews(news);
        setGithubTrending(github);
        setLastUpdated(new Date().toLocaleTimeString());
      } catch (err) {
        setError('Failed to load news. Please refresh.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadNews();
  }, []);

  // ===== FILTER & SEARCH LOGIC =====
  useEffect(() => {
    let result = allNews;

    // Apply category filter
    result = filterNewsByCategory(result, selectedCategory);

    // Apply search
    result = searchNews(result, searchQuery);

    setFilteredNews(result);
  }, [allNews, selectedCategory, searchQuery]);

  // ===== LOAD BOOKMARKS FROM LOCALSTORAGE =====
  useEffect(() => {
    const saved = localStorage.getItem('news-bookmarks');
    if (saved) {
      try {
        setBookmarks(JSON.parse(saved));
      } catch (err) {
        console.error('Failed to load bookmarks:', err);
      }
    }

    const savedDarkMode = localStorage.getItem('dark-mode');
    if (savedDarkMode) {
      setDarkMode(JSON.parse(savedDarkMode));
    }
  }, []);

  // ===== SAVE BOOKMARKS TO LOCALSTORAGE =====
  useEffect(() => {
    localStorage.setItem('news-bookmarks', JSON.stringify(bookmarks));
  }, [bookmarks]);

  // ===== SAVE DARK MODE TO LOCALSTORAGE =====
  useEffect(() => {
    localStorage.setItem('dark-mode', JSON.stringify(darkMode));
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  // ===== BOOKMARK ACTIONS =====
  const toggleBookmark = (news: NewsItem) => {
    const exists = bookmarks.find(b => b.id === news.id);
    
    if (exists) {
      // Remove bookmark
      setBookmarks(bookmarks.filter(b => b.id !== news.id));
    } else {
      // Add bookmark
      const bookmark: Bookmark = {
        ...news,
        bookmarkedAt: new Date().toISOString(),
      };
      setBookmarks([...bookmarks, bookmark]);
    }
  };

  const isBookmarked = (newsId: string): boolean => {
    return bookmarks.some(b => b.id === newsId);
  };

  // ===== REFRESH NEWS =====
  const refreshNews = async () => {
    setLoading(true);
    try {
      const { news, github } = await fetchAllNews();
      setAllNews(news);
      setGithubTrending(github);
      setLastUpdated(new Date().toLocaleTimeString());
    } catch {
      setError('Failed to refresh. Try again.');
    } finally {
      setLoading(false);
    }
  };

  // ===== RETURN ALL STATE & ACTIONS =====
  return {
    // Data
    news: filteredNews,
    allNews,
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
  };
}
