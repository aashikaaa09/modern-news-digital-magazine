import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, TrendingUp } from 'lucide-react';
import Badge from './Badge';
import BookmarkButton from './BookmarkButton';
import { getCategoryBySlug } from '../../data/categories';

export const ArticleCard = ({ article, variant = 'standard', className = '' }) => {
  if (!article) return null;

  const categoryMeta = getCategoryBySlug(article.category);

  const formatDate = (dateString) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      });
    } catch {
      return dateString;
    }
  };

  // Variant 1: Featured Hero Card
  if (variant === 'featured') {
    return (
      <article className={`group relative rounded-2xl overflow-hidden bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl dark:shadow-2xl transition-all duration-300 hover:border-slate-300 dark:hover:border-slate-700 ${className}`}>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
          <div className="lg:col-span-7 relative min-h-[300px] lg:min-h-[440px] overflow-hidden">
            <img
              src={article.imageUrl}
              alt={article.title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent lg:hidden" />
            <div className="absolute top-4 left-4 z-10">
              <Badge color={categoryMeta.color} size="md">
                {article.categoryName}
              </Badge>
            </div>
            <div className="absolute top-4 right-4 z-10">
              <BookmarkButton articleId={article.id} />
            </div>
          </div>

          <div className="lg:col-span-5 p-6 lg:p-8 flex flex-col justify-between bg-white dark:bg-slate-900/90 backdrop-blur-sm">
            <div className="space-y-4">
              {article.isTrending && (
                <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-600 dark:text-amber-400">
                  <TrendingUp className="w-4 h-4" />
                  <span># {article.trendingRank || 1} Trending Story</span>
                </div>
              )}
              <h2 className="text-2xl lg:text-3xl font-extrabold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors leading-tight font-serif">
                <Link to={`/article/${article.id}`}>
                  {article.title}
                </Link>
              </h2>
              <p className="text-slate-600 dark:text-slate-300 text-sm line-clamp-3 leading-relaxed">
                {article.summary}
              </p>
            </div>

            <div className="pt-6 mt-6 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img
                  src={article.author.avatar}
                  alt={article.author.name}
                  className="w-9 h-9 rounded-full object-cover border border-slate-200 dark:border-slate-700"
                />
                <div>
                  <p className="text-xs font-semibold text-slate-800 dark:text-slate-200">{article.author.name}</p>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">{formatDate(article.publishedAt)}</p>
                </div>
              </div>
              <div className="flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400">
                <Clock className="w-3.5 h-3.5" />
                <span>{article.readTimeMinutes} min read</span>
              </div>
            </div>
          </div>
        </div>
      </article>
    );
  }

  // Variant 2: Horizontal Card (Search / List layout)
  if (variant === 'horizontal') {
    return (
      <article className={`group flex flex-col sm:flex-row gap-5 p-4 rounded-xl bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800/80 hover:border-slate-300 dark:hover:border-slate-700 transition-all duration-200 ${className}`}>
        <div className="relative w-full sm:w-48 h-40 sm:h-auto flex-shrink-0 rounded-lg overflow-hidden">
          <img
            src={article.imageUrl}
            alt={article.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute top-2 left-2 z-10">
            <Badge color={categoryMeta.color} size="xs">
              {article.categoryName}
            </Badge>
          </div>
        </div>

        <div className="flex-1 flex flex-col justify-between space-y-2">
          <div>
            <div className="flex items-center justify-between mb-1">
              <span className="text-[11px] text-slate-500 dark:text-slate-400 flex items-center gap-1">
                <Clock className="w-3 h-3" /> {article.readTimeMinutes} min read
              </span>
              <BookmarkButton articleId={article.id} />
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors leading-snug font-serif">
              <Link to={`/article/${article.id}`}>
                {article.title}
              </Link>
            </h3>
            <p className="text-slate-600 dark:text-slate-400 text-xs line-clamp-2 mt-1.5 leading-relaxed">
              {article.summary}
            </p>
          </div>

          <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 pt-2 border-t border-slate-200 dark:border-slate-800/60">
            <span>By {article.author.name}</span>
            <span>{formatDate(article.publishedAt)}</span>
          </div>
        </div>
      </article>
    );
  }

  // Variant 3: Compact Card (Trending sidebar list item)
  if (variant === 'compact') {
    return (
      <article className={`group flex items-start gap-4 p-3 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800/50 transition-colors ${className}`}>
        {article.trendingRank && (
          <span className="text-2xl font-black text-slate-400 dark:text-slate-500 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors w-6 flex-shrink-0 text-center">
            {String(article.trendingRank).padStart(2, '0')}
          </span>
        )}
        <div className="flex-1 space-y-1">
          <div className="flex items-center justify-between gap-2">
            <Badge color={categoryMeta.color} size="xs">
              {article.categoryName}
            </Badge>
            <span className="text-[10px] text-slate-500 dark:text-slate-400">{article.readTimeMinutes}m read</span>
          </div>
          <h4 className="text-sm font-bold text-slate-900 dark:text-slate-200 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors leading-snug line-clamp-2">
            <Link to={`/article/${article.id}`}>
              {article.title}
            </Link>
          </h4>
        </div>
      </article>
    );
  }

  // Default Variant: Standard Grid Card
  return (
    <article className={`group flex flex-col justify-between rounded-xl overflow-hidden bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 shadow-sm hover:shadow-lg transition-all duration-300 ${className}`}>
      <div>
        <div className="relative aspect-video overflow-hidden">
          <img
            src={article.imageUrl}
            alt={article.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute top-3 left-3 z-10">
            <Badge color={categoryMeta.color} size="sm">
              {article.categoryName}
            </Badge>
          </div>
          <div className="absolute top-3 right-3 z-10">
            <BookmarkButton articleId={article.id} />
          </div>
        </div>

        <div className="p-5 space-y-3">
          <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
            <span>{formatDate(article.publishedAt)}</span>
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              {article.readTimeMinutes} min read
            </span>
          </div>

          <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors leading-snug line-clamp-2 font-serif">
            <Link to={`/article/${article.id}`}>
              {article.title}
            </Link>
          </h3>

          <p className="text-slate-600 dark:text-slate-400 text-xs line-clamp-3 leading-relaxed">
            {article.summary}
          </p>
        </div>
      </div>

      <div className="p-5 pt-0 mt-auto border-t border-slate-100 dark:border-slate-800/50 flex items-center justify-between">
        <div className="flex items-center gap-2.5 mt-3">
          <img
            src={article.author.avatar}
            alt={article.author.name}
            className="w-7 h-7 rounded-full object-cover border border-slate-200 dark:border-slate-700"
          />
          <span className="text-xs font-medium text-slate-700 dark:text-slate-300">{article.author.name}</span>
        </div>
      </div>
    </article>
  );
};

export default ArticleCard;
