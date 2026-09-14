import React from 'react';
import { Bookmark, BookmarkCheck } from 'lucide-react';
import { useBookmarks } from '../../context/BookmarkContext';

export const BookmarkButton = ({ articleId, variant = 'icon-only', className = '' }) => {
  const { isBookmarked, toggleBookmark } = useBookmarks();
  const bookmarked = isBookmarked(articleId);

  const handleClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleBookmark(articleId);
  };

  const label = bookmarked ? 'Remove bookmark' : 'Bookmark article';

  if (variant === 'with-text') {
    return (
      <button
        type="button"
        onClick={handleClick}
        aria-label={label}
        title={label}
        className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium border transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-amber-500/50 ${
          bookmarked
            ? 'bg-amber-500/10 border-amber-500/30 text-amber-600 dark:text-amber-400 hover:bg-amber-500/20'
            : 'bg-slate-100 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
        } ${className}`}
      >
        {bookmarked ? (
          <BookmarkCheck className="w-4 h-4 fill-amber-500 text-amber-500" />
        ) : (
          <Bookmark className="w-4 h-4" />
        )}
        <span>{bookmarked ? 'Saved' : 'Save'}</span>
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label={label}
      title={label}
      className={`p-2 rounded-full backdrop-blur-md border transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-amber-500/50 ${
        bookmarked
          ? 'bg-amber-500/20 border-amber-500/40 text-amber-400 fill-amber-400 shadow-md scale-105'
          : 'bg-slate-900/60 hover:bg-slate-900/80 border-slate-700/60 text-slate-300 hover:text-white'
      } ${className}`}
    >
      {bookmarked ? (
        <BookmarkCheck className="w-4 h-4 fill-amber-400 text-amber-400" />
      ) : (
        <Bookmark className="w-4 h-4" />
      )}
    </button>
  );
};

export default BookmarkButton;
