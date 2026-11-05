import { useState, useCallback } from 'react';
import { BlogPost } from '../types/blog';

interface SearchResult {
  post: BlogPost;
  score: number;
  reason?: string;
}

// Levenshtein distance for fuzzy matching
const levenshteinDistance = (str1: string, str2: string): number => {
  const track = Array(str2.length + 1)
    .fill(null)
    .map(() => Array(str1.length + 1).fill(0));

  for (let i = 0; i <= str1.length; i += 1) track[0][i] = i;
  for (let j = 0; j <= str2.length; j += 1) track[j][0] = j;

  for (let j = 1; j <= str2.length; j += 1) {
    for (let i = 1; i <= str1.length; i += 1) {
      const indicator = str1[i - 1] === str2[j - 1] ? 0 : 1;
      track[j][i] = Math.min(
        track[j][i - 1] + 1,
        track[j - 1][i] + 1,
        track[j - 1][i - 1] + indicator
      );
    }
  }

  return track[str2.length][str1.length];
};

// Calculate similarity score (0-1)
const calculateSimilarity = (str1: string, str2: string): number => {
  const distance = levenshteinDistance(str1.toLowerCase(), str2.toLowerCase());
  const maxLength = Math.max(str1.length, str2.length);
  return 1 - distance / maxLength;
};

// Basic AI semantic search using Ollama
const getAISearchKeywords = async (query: string): Promise<string[]> => {
  try {
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: 'gpt-oss:120b',
        messages: [
          {
            role: 'system',
            content: 'You are a search keyword extractor. Extract 3-5 relevant keywords from the user query. Return ONLY comma-separated keywords, no explanations.',
          },
          {
            role: 'user',
            content: `Extract keywords from: "${query}"`,
          },
        ],
        stream: false,
      }),
    });

    if (!response.ok) return [];

    const data = await response.json();
    const keywords = data.message?.content || data.choices?.[0]?.message?.content || '';
    return keywords
      .split(',')
      .map((k: string) => k.trim())
      .filter((k: string) => k.length > 0);
  } catch {
    return [];
  }
};

export const useAIBlogSearch = () => {
  const [isSearching, setIsSearching] = useState(false);

  const searchPosts = useCallback(
    async (
      posts: BlogPost[],
      searchTerm: string,
      useAI: boolean = false
    ): Promise<BlogPost[]> => {
      if (!searchTerm.trim()) return posts;

      setIsSearching(true);

      try {
        let keywords = [searchTerm];

        // Get AI-extracted keywords for better search
        if (useAI) {
          const aiKeywords = await getAISearchKeywords(searchTerm);
          keywords = aiKeywords.length > 0 ? aiKeywords : [searchTerm];
        }

        // Score each post with improved ranking
        const scoredResults: SearchResult[] = posts
          .map((post) => {
            let totalScore = 0;
            let hasExactMatch = false;

            // Search in title (HIGHEST weight - most relevant)
            keywords.forEach((keyword) => {
              const titleLower = post.title.toLowerCase();
              const keywordLower = keyword.toLowerCase();

              // Exact phrase match in title (top priority)
              if (titleLower.includes(keywordLower)) {
                totalScore += 100;
                hasExactMatch = true;
              } else {
                // Fuzzy match in title
                const titleSimilarity = calculateSimilarity(keyword, post.title);
                if (titleSimilarity > 0.6) {
                  totalScore += 50 * titleSimilarity;
                }
              }

              // Exact word match bonus
              const titleWords = titleLower.split(/\s+/);
              if (titleWords.some(word => word === keywordLower)) {
                totalScore += 75;
              }
            });

            // Search in excerpt (medium-high weight)
            keywords.forEach((keyword) => {
              const excerptLower = post.excerpt?.toLowerCase() || '';
              const keywordLower = keyword.toLowerCase();

              if (excerptLower.includes(keywordLower)) {
                totalScore += 40;
              }
            });

            // Search in tags (high weight - very relevant)
            keywords.forEach((keyword) => {
              const tagMatches = post.tags?.filter((tag) =>
                tag.toLowerCase().includes(keyword.toLowerCase())
              ).length || 0;
              if (tagMatches > 0) {
                totalScore += 35 * tagMatches;
              }
            });

            // Search in category (medium weight)
            keywords.forEach((keyword) => {
              if (post.category.toLowerCase().includes(keyword.toLowerCase())) {
                totalScore += 30;
              }
            });

            // Search in content (lower weight - less relevant than title/tags)
            keywords.forEach((keyword) => {
              const contentLower = post.content.toLowerCase();
              const keywordLower = keyword.toLowerCase();

              // Count occurrences in content
              const occurrences = (contentLower.match(new RegExp(keywordLower, 'g')) || []).length;
              totalScore += Math.min(occurrences * 2, 20); // Cap at 20 points
            });

            return { post, score: totalScore, hasExactMatch };
          })
          .filter((result) => result.score > 0)
          .sort((a, b) => {
            // Sort by exact match first, then by score
            if (a.hasExactMatch && !b.hasExactMatch) return -1;
            if (!a.hasExactMatch && b.hasExactMatch) return 1;
            return b.score - a.score;
          });

        setIsSearching(false);
        return scoredResults.map((r) => r.post);
      } catch {
        setIsSearching(false);
        // Fallback to basic search if AI fails
        return posts.filter(
          (post) =>
            post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            post.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
            post.excerpt?.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }
    },
    []
  );

  return { searchPosts, isSearching };
};
