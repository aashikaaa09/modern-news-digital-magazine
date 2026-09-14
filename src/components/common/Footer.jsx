import React from 'react';
import { Link } from 'react-router-dom';
import { Newspaper } from 'lucide-react';
import { categories } from '../../data/categories';

export const Footer = () => {
  return (
    <footer className="mt-20 bg-slate-100 dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 text-sm transition-colors duration-200">
      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-12 gap-8">
        {/* Brand info */}
        <div className="md:col-span-5 space-y-4">
          <Link to="/" className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 to-purple-500 flex items-center justify-center text-white">
              <Newspaper className="w-4 h-4" />
            </div>
            <span className="text-xl font-black text-slate-900 dark:text-white font-serif uppercase tracking-tight">
              Chronicle
            </span>
          </Link>
          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed max-w-sm">
            Chronicle is a digital news and magazine platform delivering high-impact journalism across science, artificial intelligence, business markets, and global culture.
          </p>
          <p className="text-[11px] text-slate-500">
            Frontend Internship Project • Built with React & Tailwind CSS
          </p>
        </div>

        {/* Category Directory */}
        <div className="md:col-span-4 space-y-3">
          <h4 className="text-xs font-bold uppercase tracking-widest text-slate-800 dark:text-slate-200">
            News Categories
          </h4>
          <ul className="grid grid-cols-2 gap-2 text-xs">
            {categories.map(cat => (
              <li key={cat.id}>
                <Link
                  to={cat.slug === 'all' ? '/' : `/category/${cat.slug}`}
                  className="hover:text-indigo-600 dark:hover:text-indigo-400 transition"
                >
                  {cat.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Navigation Quick Links */}
        <div className="md:col-span-3 space-y-3">
          <h4 className="text-xs font-bold uppercase tracking-widest text-slate-800 dark:text-slate-200">
            Platform Navigation
          </h4>
          <ul className="space-y-2 text-xs">
            <li><Link to="/" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition">Homepage</Link></li>
            <li><Link to="/search" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition">Search & Filter</Link></li>
            <li><Link to="/bookmarks" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition">Saved Bookmarks</Link></li>
          </ul>
        </div>
      </div>

      {/* Bottom Copyright */}
      <div className="border-t border-slate-200 dark:border-slate-800/80 py-6 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} Chronicle Digital Magazine. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
