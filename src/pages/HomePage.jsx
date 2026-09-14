import React from 'react';
import { Link } from 'react-router-dom';
import { TrendingUp, Sparkles, ArrowRight } from 'lucide-react';
import ArticleCard from '../components/common/ArticleCard';
import Badge from '../components/common/Badge';
import { articles, getFeaturedArticles, getTrendingArticles } from '../data/articles';
import { categories } from '../data/categories';

export const HomePage = () => {
  const featuredArticles = getFeaturedArticles();
  const mainFeatured = featuredArticles[0] || articles[0];
  const secondaryFeatured = featuredArticles.slice(1, 3);
  if (secondaryFeatured.length === 0) {
    secondaryFeatured.push(articles[1], articles[2]);
  }

  const trendingArticles = getTrendingArticles();
  
  // Category breakdown groups (Tech, Business, Science, Culture)
  const categorySections = categories.filter(c => c.id !== 'all').slice(0, 4);

  return (
    <div className="space-y-16 py-6">
      {/* 1. Hero Featured Spotlight Section */}
      <section className="space-y-6">
        <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
            <h2 className="text-sm font-extrabold uppercase tracking-widest text-slate-800 dark:text-slate-200">
              Featured Edition Spotlight
            </h2>
          </div>
          <span className="text-xs text-slate-500 dark:text-slate-400">Curated Lead Journalism</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main Hero Spotlight */}
          <div className="lg:col-span-8">
            <ArticleCard article={mainFeatured} variant="featured" />
          </div>

          {/* Secondary Featured Stack */}
          <div className="lg:col-span-4 flex flex-col justify-between gap-6">
            {secondaryFeatured.map((art) => (
              <ArticleCard key={art.id} article={art} variant="standard" className="h-full" />
            ))}
          </div>
        </div>
      </section>

      {/* 2. Trending & Editor's Grid Section */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Main Feed: Recent Articles */}
        <div className="lg:col-span-8 space-y-6">
          <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
            <h2 className="text-sm font-extrabold uppercase tracking-widest text-slate-800 dark:text-slate-200">
              Latest Coverage
            </h2>
            <Link to="/search" className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:text-indigo-500 dark:hover:text-indigo-300 flex items-center gap-1">
              View all stories <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {articles.slice(2, 6).map((art) => (
              <ArticleCard key={art.id} article={art} variant="standard" />
            ))}
          </div>
        </div>

        {/* Sidebar: Trending Section */}
        <aside className="lg:col-span-4 space-y-6">
          <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-amber-600 dark:text-amber-400" />
              <h2 className="text-sm font-extrabold uppercase tracking-widest text-slate-800 dark:text-slate-200">
                Top Trending
              </h2>
            </div>
            <span className="text-xs text-amber-600 dark:text-amber-400 font-semibold">Ranked #1–5</span>
          </div>

          <div className="p-4 rounded-2xl bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 space-y-2 shadow-sm dark:shadow-lg">
            {trendingArticles.map((art) => (
              <ArticleCard key={art.id} article={art} variant="compact" />
            ))}
          </div>
        </aside>
      </section>

      {/* 3. Category-Based Article Showcase Sections */}
      <section className="space-y-12">
        {categorySections.map((category) => {
          const categoryArticles = articles.filter(a => a.category === category.slug);
          if (categoryArticles.length === 0) return null;

          return (
            <div key={category.id} className="space-y-6">
              <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
                <div className="flex items-center gap-3">
                  <Badge color={category.color} size="md">
                    {category.name}
                  </Badge>
                  <p className="text-xs text-slate-500 dark:text-slate-400 hidden sm:block">
                    {category.description}
                  </p>
                </div>
                <Link
                  to={`/category/${category.slug}`}
                  className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:text-indigo-500 dark:hover:text-indigo-300 flex items-center gap-1"
                >
                  Explore {category.name} <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {categoryArticles.slice(0, 3).map((art) => (
                  <ArticleCard key={art.id} article={art} variant="standard" />
                ))}
              </div>
            </div>
          );
        })}
      </section>
    </div>
  );
};

export default HomePage;
