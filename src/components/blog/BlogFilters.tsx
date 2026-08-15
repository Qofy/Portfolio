import { Search } from 'lucide-react';
import { BlogPost, DEFAULT_CATEGORIES } from '../../types/blog';

interface BlogFiltersProps {
  posts: BlogPost[];
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  selectedDate: string;
  setSelectedDate: (date: string) => void;
}

export function BlogFilters({
  posts,
  searchTerm,
  setSearchTerm,
  selectedCategory,
  setSelectedCategory,
  selectedDate,
  setSelectedDate,
}: BlogFiltersProps) {
  const dates = [...new Set(posts.map(p => p.date))].sort().reverse();
  const categories = ['All', ...DEFAULT_CATEGORIES];

  return (
    <div className="blog-controls">
      <div className="search-box">
        <Search size={20} />
        <input
          type="text"
          placeholder="Search posts..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="blog-filters">
        <div className="filter-section">
          <h4>Topics</h4>
          <div className="filter-tags">
            {categories.map(cat => (
              <button
                key={cat}
                className={`tag ${selectedCategory === cat ? 'active' : ''}`}
                onClick={() => setSelectedCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="filter-section">
          <h4>Date</h4>
          <div className="filter-tags">
            <button
              className={`tag ${selectedDate === 'All' ? 'active' : ''}`}
              onClick={() => setSelectedDate('All')}
            >
              All Dates
            </button>
            {dates.map(date => (
              <button
                key={date}
                className={`tag ${selectedDate === date ? 'active' : ''}`}
                onClick={() => setSelectedDate(date)}
              >
                {new Date(date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric'
                })}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
