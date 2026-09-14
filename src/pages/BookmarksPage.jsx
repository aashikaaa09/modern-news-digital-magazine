import React from 'react';
import { Link } from 'react-router-dom';
import { Bookmark, Trash2, ArrowLeft } from 'lucide-react';
import ArticleCard from '../components/common/ArticleCard';
import { useBookmarks } from '../context/BookmarkContext';
import { articles } from '../data/articles';

export const BookmarksPage = () => {
  const { bookmarks, clearBookmarks } = useBookmarks();

  const bookmarkedArticles = articles.filter(art => bookmarks.includes(art.id));

  return (
    <div className="space-y-8 py-6">
      {/* Header Banner */}
      <div className="p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm dark:shadow-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 transition-colors duration-200">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-amber-600 dark:text-amber-400">
            <Bookmark className="w-5 h-5 fill-amber-500 text-amber-500" />
            <span className="text-xs font-bold uppercase tracking-wider">Saved Reading List</span>
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white font-serif tracking-tight">
            Bookmarked Articles ({bookmarkedArticles.length})
          </h1>
          <p className="text-slate-600 dark:text-slate-400 text-xs">
            Articles saved to your local browser storage for quick offline access.
          </p>
        </div>

        {bookmarkedArticles.length > 0 && (
          <button
            onClick={clearBookmarks}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-600 dark:text-rose-400 border border-rose-500/20 text-xs font-semibold transition"
          >
            <Trash2 className="w-4 h-4" />
            <span>Clear All Bookmarks</span>
          </button>
        )}
      </div>

      {/* Bookmarks Grid or Empty State */}
      {bookmarkedArticles.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {bookmarkedArticles.map(art => (
            <ArticleCard key={art.id} article={art} variant="standard" />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 p-8 rounded-3xl bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800/80 space-y-4 max-w-md mx-auto shadow-sm dark:shadow-none">
          <div className="w-16 h-16 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-600 dark:text-amber-400 flex items-center justify-center mx-auto">
            <Bookmark className="w-8 h-8" />
          </div>
          <div className="space-y-1">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">No Bookmarks Saved Yet</h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Click the bookmark icon on any article card or reader page to save stories to your reading list.
            </p>
          </div>
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-semibold transition shadow-lg shadow-indigo-600/20"
          >
            <ArrowLeft className="w-4 h-4" /> Discover Articles
          </Link>
        </div>
      )}
    </div>
  );
};

export default BookmarksPage;
