import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Clock, Calendar, ArrowLeft, Share2, Check } from 'lucide-react';
import Badge from '../components/common/Badge';
import BookmarkButton from '../components/common/BookmarkButton';
import ArticleCard from '../components/common/ArticleCard';
import ReadingControls from '../components/article/ReadingControls';
import { getArticleById, articles } from '../data/articles';
import { getCategoryBySlug } from '../data/categories';
import { usePreferences } from '../context/PreferencesContext';

export const ArticleDetailPage = () => {
  const { id } = useParams();
  const article = getArticleById(id);
  const { preferences } = usePreferences();
  const [copied, setCopied] = React.useState(false);

  if (!article) {
    return (
      <div className="text-center py-20 px-4 space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Article Not Found</h2>
        <p className="text-slate-600 dark:text-slate-400 text-sm">The article you are looking for does not exist or has been removed.</p>
        <Link to="/" className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg text-xs font-semibold hover:bg-indigo-500">
          <ArrowLeft className="w-4 h-4" /> Back to Homepage
        </Link>
      </div>
    );
  }

  const categoryMeta = getCategoryBySlug(article.category);
  const formatDate = (dateString) => {
    try {
      return new Date(dateString).toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric'
      });
    } catch {
      return dateString;
    }
  };

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Dynamic preference styling classes
  const fontSizeClass = 
    preferences.fontSize === 'sm' ? 'text-base' :
    preferences.fontSize === 'lg' ? 'text-xl' :
    preferences.fontSize === 'xl' ? 'text-2xl' : 'text-lg';

  const fontFamilyClass = 
    preferences.fontFamily === 'serif' ? 'font-serif' :
    preferences.fontFamily === 'mono' ? 'font-mono' : 'font-sans';

  const lineSpacingClass = 
    preferences.lineSpacing === 'normal' ? 'leading-normal' :
    preferences.lineSpacing === 'loose' ? 'leading-loose' : 'leading-relaxed';

  // Related articles from same category
  const relatedArticles = articles
    .filter(a => a.category === article.category && a.id !== article.id)
    .slice(0, 3);

  return (
    <article className="max-w-4xl mx-auto py-6 space-y-8">
      {/* Top Back Navigation Bar */}
      <div className="flex items-center justify-between">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-xs font-semibold text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Articles
        </Link>
        <div className="flex items-center gap-3">
          <button
            onClick={handleShare}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 text-xs font-medium hover:bg-slate-100 dark:hover:bg-slate-800 transition"
            title="Copy article link"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Share2 className="w-3.5 h-3.5" />}
            <span>{copied ? 'Copied Link' : 'Share'}</span>
          </button>
          <BookmarkButton articleId={article.id} variant="with-text" />
        </div>
      </div>

      {/* Article Header */}
      <header className="space-y-6">
        <div className="space-y-3">
          <Badge color={categoryMeta.color} size="md">
            {article.categoryName}
          </Badge>
          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white font-serif leading-tight tracking-tight">
            {article.title}
          </h1>
          <p className="text-lg sm:text-xl text-slate-700 dark:text-slate-300 font-serif leading-relaxed">
            {article.subtitle}
          </p>
        </div>

        {/* Author & Meta Row */}
        <div className="pt-4 border-t border-b border-slate-200 dark:border-slate-800 py-4 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <img
              src={article.author.avatar}
              alt={article.author.name}
              className="w-11 h-11 rounded-full object-cover border-2 border-indigo-500/30"
            />
            <div>
              <p className="text-sm font-bold text-slate-900 dark:text-white">{article.author.name}</p>
              <p className="text-xs text-slate-500 dark:text-slate-400">{article.author.role}</p>
            </div>
          </div>

          <div className="flex items-center gap-4 text-xs text-slate-500 dark:text-slate-400">
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5" />
              {formatDate(article.publishedAt)}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              {article.readTimeMinutes} min read
            </span>
          </div>
        </div>
      </header>

      {/* Hero Image */}
      <div className="space-y-2">
        <div className="rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 aspect-video shadow-xl">
          <img
            src={article.imageUrl}
            alt={article.title}
            className="w-full h-full object-cover"
          />
        </div>
        {article.imageCaption && (
          <p className="text-center text-xs text-slate-500 dark:text-slate-400 italic">
            {article.imageCaption}
          </p>
        )}
      </div>

      {/* Reader Preference Controls Toolbar */}
      <ReadingControls />

      {/* Dynamic Article Content Body */}
      <div className={`space-y-6 ${fontSizeClass} ${fontFamilyClass} ${lineSpacingClass} text-slate-800 dark:text-slate-200`}>
        {article.content && article.content.map((block, index) => {
          if (block.type === 'heading') {
            return (
              <h2 key={index} className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white font-serif mt-8 mb-4 border-b border-slate-200 dark:border-slate-800/80 pb-2">
                {block.text}
              </h2>
            );
          }
          if (block.type === 'quote') {
            return (
              <blockquote key={index} className="my-6 p-6 rounded-2xl bg-indigo-50 dark:bg-indigo-500/10 border-l-4 border-indigo-500 italic text-indigo-900 dark:text-indigo-200">
                <p className="mb-2">"{block.text}"</p>
                {block.author && <cite className="not-italic text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">— {block.author}</cite>}
              </blockquote>
            );
          }
          if (block.type === 'image') {
            return (
              <figure key={index} className="my-6 space-y-2">
                <div className="rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800">
                  <img src={block.url} alt={block.caption || 'Article image'} className="w-full h-auto object-cover" />
                </div>
                {block.caption && <figcaption className="text-center text-xs text-slate-500 dark:text-slate-400">{block.caption}</figcaption>}
              </figure>
            );
          }
          return (
            <p key={index} className="text-slate-700 dark:text-slate-300">
              {block.text}
            </p>
          );
        })}
      </div>

      {/* Related Articles Recommendations */}
      {relatedArticles.length > 0 && (
        <section className="pt-12 border-t border-slate-200 dark:border-slate-800 space-y-6">
          <h3 className="text-xs font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400">
            More in {article.categoryName}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedArticles.map((rel) => (
              <ArticleCard key={rel.id} article={rel} variant="standard" />
            ))}
          </div>
        </section>
      )}
    </article>
  );
};

export default ArticleDetailPage;
