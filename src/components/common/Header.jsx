import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Search, Sun, Moon, Bookmark, Menu, X, Newspaper } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { useBookmarks } from '../../context/BookmarkContext';
import { categories } from '../../data/categories';

export const Header = () => {
  const { theme, toggleTheme } = useTheme();
  const { bookmarks } = useBookmarks();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navCategories = categories.filter(cat => cat.id !== 'all');

  return (
    <header className="sticky top-0 z-50 bg-white/90 dark:bg-slate-950/90 text-slate-900 dark:text-slate-100 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 transition-colors duration-200">
      {/* Top Banner Date & Tagline Bar */}
      <div className="hidden md:block bg-slate-100 dark:bg-slate-900/80 border-b border-slate-200 dark:border-slate-800 text-[11px] text-slate-500 dark:text-slate-400 py-1.5 px-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span>{new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}</span>
            <span className="text-slate-300 dark:text-slate-700">•</span>
            <span>Digital Journal of Science, Tech & Modern Culture</span>
          </div>
          <div className="flex items-center gap-3 font-medium">
            <span className="text-emerald-500 dark:text-emerald-400 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
              Live Edition
            </span>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          
          {/* Mobile Hamburger Toggle */}
          <div className="flex items-center lg:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Magazine Brand Logo */}
          <div className="flex items-center gap-2">
            <Link to="/" className="flex items-center gap-2.5 group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-purple-500 flex items-center justify-center text-white shadow-lg shadow-indigo-500/20 group-hover:scale-105 transition-transform">
                <Newspaper className="w-5 h-5" />
              </div>
              <div className="flex flex-col">
                <span className="text-xl sm:text-2xl font-black tracking-tight text-slate-900 dark:text-white font-serif uppercase">
                  Chronicle
                </span>
                <span className="text-[10px] tracking-widest uppercase font-semibold text-indigo-600 dark:text-indigo-400 -mt-1">
                  Digital Magazine
                </span>
              </div>
            </Link>
          </div>

          {/* Desktop Category Navigation */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            <NavLink
              to="/"
              end
              className={({ isActive }) =>
                `px-3 py-2 text-xs font-bold uppercase tracking-wider rounded-lg transition-colors ${
                  isActive
                    ? 'text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-500/10'
                    : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/60'
                }`
              }
            >
              Home
            </NavLink>
            {navCategories.map(category => (
              <NavLink
                key={category.id}
                to={`/category/${category.slug}`}
                className={({ isActive }) =>
                  `px-3 py-2 text-xs font-bold uppercase tracking-wider rounded-lg transition-colors ${
                    isActive
                      ? 'text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-500/10'
                      : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/60'
                  }`
                }
              >
                {category.name}
              </NavLink>
            ))}
          </nav>

          {/* Right Action Icons: Search, Bookmarks, Theme Toggle */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Search Trigger Link */}
            <Link
              to="/search"
              aria-label="Search articles"
              title="Search articles"
              className="p-2.5 rounded-full text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
            >
              <Search className="w-5 h-5" />
            </Link>

            {/* Bookmarks Counter Link */}
            <Link
              to="/bookmarks"
              aria-label="View bookmarks"
              title="Bookmarked articles"
              className="relative p-2.5 rounded-full text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
            >
              <Bookmark className="w-5 h-5" />
              {bookmarks.length > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-amber-500 text-slate-950 font-black text-[10px] flex items-center justify-center shadow-sm">
                  {bookmarks.length}
                </span>
              )}
            </Link>

            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
              title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
              className="p-2.5 rounded-full text-slate-600 dark:text-slate-300 hover:text-amber-500 dark:hover:text-amber-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
            >
              {theme === 'dark' ? (
                <Sun className="w-5 h-5 text-amber-400" />
              ) : (
                <Moon className="w-5 h-5 text-slate-700" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 px-4 py-4 space-y-2">
          <Link
            to="/"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 text-sm font-bold uppercase tracking-wider rounded-lg text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            Home
          </Link>
          {categories.map(category => (
            <Link
              key={category.id}
              to={`/category/${category.slug}`}
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 text-sm font-bold uppercase tracking-wider rounded-lg text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              {category.name}
            </Link>
          ))}
          <div className="pt-2 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
            <Link
              to="/bookmarks"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2 px-3 py-2 text-sm font-semibold text-amber-600 dark:text-amber-400"
            >
              <Bookmark className="w-4 h-4" />
              Saved Bookmarks ({bookmarks.length})
            </Link>
            <Link
              to="/search"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2 px-3 py-2 text-sm font-semibold text-indigo-600 dark:text-indigo-400"
            >
              <Search className="w-4 h-4" />
              Search
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
