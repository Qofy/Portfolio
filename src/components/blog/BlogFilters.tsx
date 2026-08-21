import { Search, Tag, Calendar, X } from 'lucide-react';
import { useState } from 'react';
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
  const [showCategories, setShowCategories] = useState(false);
  const [showDates, setShowDates] = useState(false);

  const dates = [...new Set(posts.map(p => p.date))].sort().reverse();
  const categories = ['All', ...DEFAULT_CATEGORIES];

  const getSelectedLabel = (type: 'category' | 'date') => {
    if (type === 'category') {
      return selectedCategory === 'All' ? 'All Topics' : selectedCategory;
    } else {
      if (selectedDate === 'All') return 'All Dates';
      return new Date(selectedDate).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      });
    }
  };

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

      <div className="blog-filter-icons">
        {/* Topics Filter */}
        <div className="filter-dropdown">
          <button
            className="filter-icon-btn"
            onClick={() => setShowCategories(!showCategories)}
            title="Filter by Topics"
          >
            <Tag size={18} />
            <span className="filter-label">{getSelectedLabel('category')}</span>
          </button>

          {showCategories && (
            <div className="dropdown-menu">
              <div className="dropdown-header">
                <h4>Filter by Topics</h4>
                <button onClick={() => setShowCategories(false)}>
                  <X size={16} />
                </button>
              </div>
              <div className="dropdown-options">
                {categories.map(cat => (
                  <button
                    key={cat}
                    className={`dropdown-option ${selectedCategory === cat ? 'active' : ''}`}
                    onClick={() => {
                      setSelectedCategory(cat);
                      setShowCategories(false);
                    }}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Dates Filter */}
        <div className="filter-dropdown">
          <button
            className="filter-icon-btn"
            onClick={() => setShowDates(!showDates)}
            title="Filter by Dates"
          >
            <Calendar size={18} />
            <span className="filter-label">{getSelectedLabel('date')}</span>
          </button>

          {showDates && (
            <div className="dropdown-menu">
              <div className="dropdown-header">
                <h4>Filter by Dates</h4>
                <button onClick={() => setShowDates(false)}>
                  <X size={16} />
                </button>
              </div>
              <div className="dropdown-options">
                <button
                  className={`dropdown-option ${selectedDate === 'All' ? 'active' : ''}`}
                  onClick={() => {
                    setSelectedDate('All');
                    setShowDates(false);
                  }}
                >
                  All Dates
                </button>
                {dates.map(date => (
                  <button
                    key={date}
                    className={`dropdown-option ${selectedDate === date ? 'active' : ''}`}
                    onClick={() => {
                      setSelectedDate(date);
                      setShowDates(false);
                    }}
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
          )}
        </div>
      </div>
    </div>
  );
}
