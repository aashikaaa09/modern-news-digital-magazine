import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Layers, FolderOpen } from 'lucide-react';
import ArticleCard from '../components/common/ArticleCard';
import Badge from '../components/common/Badge';
import { categories, getCategoryBySlug } from '../data/categories';
import { getArticlesByCategory } from '../data/articles';

export const CategoryPage = () => {
  const { slug } = useParams();
  const activeSlug = slug || 'all';
  const categoryMeta = getCategoryBySlug(activeSlug);
  const categoryArticles = getArticlesByCategory(activeSlug);

  return (
    <div className="space-y-8 py-6">
      {/* Category Header Banner */}
      <div className="p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm dark:shadow-xl space-y-4 transition-colors duration-200">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <Badge color={categoryMeta.color} size="md">
                {categoryMeta.name}
              </Badge>
              <span className="text-xs text-slate-500 dark:text-slate-400">
                {categoryArticles.length} {categoryArticles.length === 1 ? 'Article' : 'Articles'}
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white font-serif tracking-tight">
              {categoryMeta.name} Coverage
            </h1>
            <p className="text-slate-600 dark:text-slate-400 text-sm max-w-2xl">
              {categoryMeta.description}
            </p>
          </div>
        </div>

        {/* Category Navigation Pills */}
        <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex flex-wrap items-center gap-2">
          <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 mr-2 flex items-center gap-1">
            <Layers className="w-3.5 h-3.5" /> Categories:
          </span>
          {categories.map((cat) => {
            const isActive = cat.slug === activeSlug;
            return (
              <Link
                key={cat.id}
                to={cat.slug === 'all' ? '/' : `/category/${cat.slug}`}
                className={`px-3 py-1 text-xs font-semibold rounded-full border transition ${
                  isActive
                    ? 'bg-indigo-600 text-white border-indigo-500 shadow-sm'
                    : 'bg-slate-100 dark:bg-slate-950/60 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-800 hover:bg-slate-200 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                {cat.name}
              </Link>
            );
          })}
        </div>
      </div>

      {/* Articles Grid */}
      {categoryArticles.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categoryArticles.map((art) => (
            <ArticleCard key={art.id} article={art} variant="standard" />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 p-8 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4">
          <FolderOpen className="w-12 h-12 text-slate-400 dark:text-slate-600 mx-auto" />
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">No articles found in this category</h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">Explore other news categories above.</p>
          <Link
            to="/"
            className="inline-block px-4 py-2 text-xs font-semibold text-white bg-indigo-600 rounded-lg hover:bg-indigo-500"
          >
            Return to Homepage
          </Link>
        </div>
      )}
    </div>
  );
};

export default CategoryPage;
