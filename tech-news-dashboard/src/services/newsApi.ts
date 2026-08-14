import type { NewsItem, GitHubTrendingRepo } from '../types/news';

interface GitHubRepository {
  name: string;
  html_url: string;
  description: string | null;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  owner: { avatar_url: string };
}

interface GitHubSearchResponse {
  items?: GitHubRepository[];
}

// HACK NEWS API (free, no auth needed)
const HACKER_NEWS_API = 'https://hacker-news.firebaseio.com/v0';
const GITHUB_TRENDING_API = 'https://api.github.com/search/repositories';

// RSS to JSON converter (free service, no auth)
const RSS_TO_JSON = 'https://api.rss2json.com/v1/api.json';

// Category keywords for filtering
const CATEGORY_KEYWORDS: Record<string, string[]> = {
  'AI': ['AI', 'machine learning', 'neural', 'LLM', 'ChatGPT', 'GPT', 'deep learning'],
  'Programming': ['programming', 'code', 'python', 'javascript', 'rust', 'golang'],
  'Startups': ['startup', 'funding', 'Series', 'venture', 'IPO', 'acquisition'],
  'Cybersecurity': ['security', 'hack', 'breach', 'vulnerability', 'exploit', 'crypto'],
  'Cloud': ['cloud', 'AWS', 'Azure', 'GCP', 'Kubernetes', 'Docker'],
  'Mobile': ['mobile', 'iOS', 'Android', 'app'],
  'Web Dev': ['web', 'frontend', 'backend', 'react', 'vue', 'node'],
};

/**
 * FETCH HACKER NEWS
 * Gets top stories from HN, then fetches details for each
 */
async function fetchHackerNews(limit = 15): Promise<NewsItem[]> {
  try {
    // Get top story IDs
    const topStoriesRes = await fetch(
      `${HACKER_NEWS_API}/topstories.json?limitToFirst=${limit}&orderBy="$key"`
    );
    const storyIds: number[] = await topStoriesRes.json();

    // Fetch details for each story (parallel requests)
    const stories = await Promise.all(
      storyIds.slice(0, limit).map(id =>
        fetch(`${HACKER_NEWS_API}/item/${id}.json`).then(r => r.json())
      )
    );

    // Transform to NewsItem format
    return stories
      .filter(story => story.url && story.title) // Only items with URL
      .map(story => ({
        id: `hn-${story.id}`,
        title: story.title,
        source: 'Hacker News',
        url: story.url,
        publishedAt: new Date(story.time * 1000).toISOString(),
        category: 'Programming',
        description: `${story.score} points · ${story.descendants || 0} comments`,
      }));
  } catch (error) {
    console.error('Hacker News fetch failed:', error);
    return [];
  }
}

/**
 * FETCH GITHUB TRENDING
 * Gets trending repositories from GitHub
 */
async function fetchGitHubTrending(): Promise<GitHubTrendingRepo[]> {
  try {
    // Get repos trending today (created in last week, sorted by stars)
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
    const dateStr = oneWeekAgo.toISOString().split('T')[0];

    const res = await fetch(
      `${GITHUB_TRENDING_API}?q=created:>${dateStr}&sort=stars&order=desc&per_page=10`,
      { headers: { 'Accept': 'application/vnd.github.v3+json' } }
    );

    const data: GitHubSearchResponse = await res.json();

    return (data.items || []).map(repo => ({
      name: repo.name,
      url: repo.html_url,
      description: repo.description || 'No description',
      language: repo.language || 'Unknown',
      stars: repo.stargazers_count,
      forks: repo.forks_count,
      growthToday: Math.floor(Math.random() * 100) + 10, // Mock for demo
      avatar: repo.owner.avatar_url,
    }));
  } catch (error) {
    console.error('GitHub Trending fetch failed:', error);
    return [];
  }
}

/**
 * FETCH FROM RSS FEEDS
 * Uses RSS2JSON to convert RSS to JSON (bypasses CORS)
 */
async function fetchRSSFeeds(): Promise<NewsItem[]> {
  const feeds = [
    { url: 'https://feeds.techcrunch.com/TechCrunch/', source: 'TechCrunch' },
    { url: 'https://feeds.arstechnica.com/arstechnica/index', source: 'Ars Technica' },
    { url: 'https://feeds.theverge.com/vergescape.xml', source: 'The Verge' },
  ];

  const results: NewsItem[] = [];

  for (const feed of feeds) {
    try {
      const res = await fetch(
        `${RSS_TO_JSON}?rss_url=${encodeURIComponent(feed.url)}`
      );
      const data: any = await res.json();

      if (data.items) {
        results.push(
          ...data.items.slice(0, 5).map((item: any, idx: number) => ({
            id: `${feed.source.toLowerCase()}-${idx}`,
            title: item.title,
            source: feed.source,
            url: item.link,
            publishedAt: item.pubDate || new Date().toISOString(),
            thumbnail: item.thumbnail || item.image,
            description: item.description?.substring(0, 150),
            category: 'News',
          }))
        );
      }
    } catch (error) {
      console.error(`Failed to fetch ${feed.source}:`, error);
    }
  }

  return results;
}

/**
 * CATEGORIZE NEWS
 * Assigns category based on title/description keywords
 */
function categorizeNews(news: NewsItem[]): NewsItem[] {
  return news.map(item => {
    const text = (item.title + ' ' + (item.description || '')).toLowerCase();

    for (const [category, keywords] of Object.entries(CATEGORY_KEYWORDS)) {
      if (keywords.some(keyword => text.includes(keyword.toLowerCase()))) {
        return { ...item, category };
      }
    }

    return item;
  });
}

/**
 * FILTER NEWS BY CATEGORY
 */
export function filterNewsByCategory(
  news: NewsItem[],
  category: string | null
): NewsItem[] {
  if (!category) return news;
  return news.filter(item => item.category === category);
}

/**
 * SEARCH NEWS
 */
export function searchNews(
  news: NewsItem[],
  query: string
): NewsItem[] {
  if (!query.trim()) return news;

  const lower = query.toLowerCase();
  return news.filter(item =>
    item.title.toLowerCase().includes(lower) ||
    item.description?.toLowerCase().includes(lower)
  );
}

/**
 * MAIN FETCH FUNCTION
 * Fetches all news from all sources
 */
export async function fetchAllNews(): Promise<{
  news: NewsItem[];
  github: GitHubTrendingRepo[];
}> {
  try {
    const [hackerNews, rssNews, githubTrending] = await Promise.all([
      fetchHackerNews(10),
      fetchRSSFeeds(),
      fetchGitHubTrending(),
    ]);

    // Combine and categorize
    const allNews = categorizeNews([...hackerNews, ...rssNews]);

    // Sort by date (newest first)
    allNews.sort(
      (a, b) =>
        new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    );

    return {
      news: allNews,
      github: githubTrending,
    };
  } catch (error) {
    console.error('Failed to fetch news:', error);
    return { news: [], github: [] };
  }
}

/**
 * CALCULATE READING TIME
 * Rough estimate: 200 words per minute
 */
export function calculateReadingTime(text: string): string {
  const words = text.split(/\s+/).length;
  const minutes = Math.ceil(words / 200);
  return `${minutes} min read`;
}
