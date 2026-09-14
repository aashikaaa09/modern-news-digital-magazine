# Modern News & Digital Magazine Platform

A responsive digital news and magazine frontend application developed using React.js and Tailwind CSS as an internship project. The platform provides a modern reading experience with article discovery, search, category filtering, bookmarking, customizable reading preferences, and dark/light theme switching.

## ✨ Features

- Modern news homepage
- Category-based browsing
- Article reading pages
- Search & filtering
- Trending & featured news
- Bookmarking with browser localStorage
- Dark / light mode
- Reading preferences
- Responsive design
- Reusable React components

## 🛠️ Technologies

- React.js
- JavaScript / JSX
- Tailwind CSS
- Vite
- React Router
- Browser localStorage

## 📂 Project Structure

```
modern-news-magazine/
├── public/
├── src/
│   ├── components/
│   │   ├── article/
│   │   │   └── ReadingControls.jsx
│   │   └── common/
│   │       ├── ArticleCard.jsx
│   │       ├── Badge.jsx
│   │       ├── BookmarkButton.jsx
│   │       ├── Footer.jsx
│   │       └── Header.jsx
│   ├── context/
│   │   ├── AppProviders.jsx
│   │   ├── BookmarkContext.jsx
│   │   ├── PreferencesContext.jsx
│   │   └── ThemeContext.jsx
│   ├── data/
│   │   ├── articles.js
│   │   └── categories.js
│   ├── pages/
│   │   ├── ArticleDetailPage.jsx
│   │   ├── BookmarksPage.jsx
│   │   ├── CategoryPage.jsx
│   │   ├── HomePage.jsx
│   │   └── SearchPage.jsx
│   ├── App.css
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── index.html
├── package.json
└── vite.config.js
```

## 🚀 Getting Started

```bash
npm install
npm run dev
```

## 📌 Application Routes

| Route | Description |
| --- | --- |
| `/` | Home page |
| `/category/:slug` | Category-based article page |
| `/article/:id` | Article detail and reading page |
| `/bookmarks` | Saved/bookmarked articles |
| `/search` | Search and filtering interface |

## 💡 Client-Side Features

### Bookmarking
Articles can be bookmarked directly from the interface. Bookmark data is stored in the browser's `localStorage`, allowing saved articles to remain available after refreshing the page.

### Dark / Light Theme
The application supports both dark and light themes. The selected theme preference is persisted using `localStorage` so it remains active across page reloads.

### Reading Preferences
Users can customize reading preferences including font size, font family, and line spacing while reading an article. These settings are persisted using `localStorage`.

### Search and Filtering
Users can search articles using instant text matching and filter content dynamically by news category.

## 📱 Responsive Design

The interface adapts across:
- Desktop screens
- Tablets
- Mobile devices

## 👩‍💻 Author

Aashika Kiran Nair
