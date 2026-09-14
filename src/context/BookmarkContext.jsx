import React, { createContext, useContext, useState, useEffect } from 'react';

const BookmarkContext = createContext();

export const BookmarkProvider = ({ children }) => {
  const [bookmarks, setBookmarks] = useState(() => {
    try {
      const saved = localStorage.getItem('magazine_bookmarks');
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      console.error('Failed to parse bookmarks from localStorage', e);
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('magazine_bookmarks', JSON.stringify(bookmarks));
  }, [bookmarks]);

  const toggleBookmark = (articleId) => {
    setBookmarks(prev => {
      if (prev.includes(articleId)) {
        return prev.filter(id => id !== articleId);
      } else {
        return [...prev, articleId];
      }
    });
  };

  const isBookmarked = (articleId) => {
    return bookmarks.includes(articleId);
  };

  const clearBookmarks = () => {
    setBookmarks([]);
  };

  return (
    <BookmarkContext.Provider value={{ bookmarks, toggleBookmark, isBookmarked, clearBookmarks }}>
      {children}
    </BookmarkContext.Provider>
  );
};

export const useBookmarks = () => {
  const context = useContext(BookmarkContext);
  if (!context) {
    throw new Error('useBookmarks must be used within a BookmarkProvider');
  }
  return context;
};
