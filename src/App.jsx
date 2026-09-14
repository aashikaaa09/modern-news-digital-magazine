import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/common/Header';
import Footer from './components/common/Footer';
import HomePage from './pages/HomePage';
import CategoryPage from './pages/CategoryPage';
import ArticleDetailPage from './pages/ArticleDetailPage';
import BookmarksPage from './pages/BookmarksPage';
import SearchPage from './pages/SearchPage';

function AppLayout() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100 flex flex-col justify-between font-sans selection:bg-indigo-500 selection:text-white transition-colors duration-200">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex-1">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/category/:slug" element={<CategoryPage />} />
          <Route path="/article/:id" element={<ArticleDetailPage />} />
          <Route path="/bookmarks" element={<BookmarksPage />} />
          <Route path="/search" element={<SearchPage />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppLayout />
    </BrowserRouter>
  );
}

export default App;
