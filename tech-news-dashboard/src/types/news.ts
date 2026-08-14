// All data types used in the app

export interface NewsItem {
  id: string;
  title: string;
  source: string;
  url: string;
  publishedAt: string;
  thumbnail?: string;
  category?: string;
  readingTime?: string;
  description?: string;
}

export interface GitHubTrendingRepo {
  name: string;
  url: string;
  description: string;
  language: string;
  stars: number;
  forks: number;
  growthToday: number;
  avatar: string;
}

export interface Bookmark extends NewsItem {
  bookmarkedAt: string;
}

export interface AppState {
  news: NewsItem[];
  gitHubTrending: GitHubTrendingRepo[];
  selectedCategory: string | null;
  searchQuery: string;
  loading: boolean;
  error: string | null;
  bookmarks: Bookmark[];
  darkMode: boolean;
  lastUpdated: string;
}
