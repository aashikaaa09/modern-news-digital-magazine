import React, { useState, useMemo } from 'react';
import { Search, X, SlidersHorizontal, SearchX } from 'lucide-react';
import ArticleCard from '../components/common/ArticleCard';
import { articles } from '../data/articles';
import { categories } from '../data/categories';

export const SearchPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Simple JavaScript string matching search
  const filteredArticles = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    return articles.filter(article => {
      // Category filter check
      const matchesCategory = selectedCategory === 'all' || article.category === selectedCategory;

      if (!matchesCategory) return false;
      if (!query) return true;

      // Simple JS string includes matching
      const titleMatch = article.title.toLowerCase().includes(query);
      const summaryMatch = article.summary.toLowerCase().includes(query);
      const authorMatch = article.author.name.toLowerCase().includes(query);
      const categoryMatch = article.categoryName.toLowerCase().includes(query);

      return titleMatch || summaryMatch || authorMatch || categoryMatch;
    });
  }, [searchQuery, selectedCategory]);

  const clearSearch = () => {
    setSearchQuery('');
    setSelectedCategory('all');
  };

  return (
    <div className="space-y-8 py-6">
      {/* Search Header Banner & Input Controls */}
      <div className="p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm dark:shadow-xl space-y-6 transition-colors duration-200">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400">
            <Search className="w-5 h-5" />
            <span className="text-xs font-bold uppercase tracking-wider">Discovery Engine</span>
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white font-serif tracking-tight">
            Search Magazine Archives
          </h1>
          <p className="text-slate-600 dark:text-slate-400 text-xs">
            Search articles across headlines, summaries, authors, and categories.
          </p>
        </div>

        {/* Search Input Bar */}
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 dark:text-slate-500" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by title, author, or keyword (e.g. AI, energy, space)..."
            className="w-full pl-12 pr-12 py-3.5 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-4 top-1/2 -translate-y-1/2 p-1 rounded-full text-slate-400 dark:text-slate-500 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-slate-800"
              title="Clear text"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Category Filter Chips */}
        <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-200 dark:border-slate-800">
          <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 mr-2 flex items-center gap-1">
            <SlidersHorizontal className="w-3.5 h-3.5" /> Category Filter:
          </span>
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat.slug;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.slug)}
                className={`px-3 py-1 text-xs font-semibold rounded-full border transition ${
                  isSelected
                    ? 'bg-indigo-600 text-white border-indigo-500 shadow-sm'
                    : 'bg-slate-100 dark:bg-slate-950/60 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-800 hover:bg-slate-200 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                {cat.name}
              </button>
            );
          })}
        </div>
      </div>

      {/* Search Results Summary */}
      <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 px-2">
        <span>
          Showing <strong className="text-slate-900 dark:text-white">{filteredArticles.length}</strong> {filteredArticles.length === 1 ? 'result' : 'results'}
          {searchQuery && <span> for "<span className="text-indigo-600 dark:text-indigo-400 font-semibold">{searchQuery}</span>"</span>}
        </span>
        {(searchQuery || selectedCategory !== 'all') && (
          <button
            onClick={clearSearch}
            className="text-xs text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 underline font-medium"
          >
            Reset filters
          </button>
        )}
      </div>

      {/* Results Grid or Empty State */}
      {filteredArticles.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredArticles.map(art => (
            <ArticleCard key={art.id} article={art} variant="standard" />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 p-8 rounded-3xl bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800/80 space-y-4 max-w-md mx-auto shadow-sm dark:shadow-none">
          <SearchX className="w-12 h-12 text-slate-400 dark:text-slate-600 mx-auto" />
          <div className="space-y-1">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">No Matching Articles Found</h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              We couldn't find any articles matching your search query. Try adjusting your keyword or clearing category filters.
            </p>
          </div>
          <button
            onClick={clearSearch}
            className="px-5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-semibold transition"
          >
            Reset Search
          </button>
        </div>
      )}
    </div>
  );
};

export default SearchPage;
