# \# Modern News \& Digital Magazine Platform

# 

# A responsive digital news and magazine platform developed as part of a Frontend Web Development internship project.

# 

# The application provides a modern interface for discovering, searching, filtering, reading, and bookmarking digital news articles across different categories.

# 

# \## Features

# 

# \- Modern digital-news homepage

# \- Category-based article sections

# \- Article detail and reading pages

# \- Search interface

# \- Category-based filtering

# \- Trending news section

# \- Featured news section

# \- Bookmarking using browser localStorage

# \- Dark and light theme

# \- Persistent theme preference

# \- Reading preference controls

# \- Persistent reading preferences

# \- Responsive design for mobile and desktop

# \- Reusable React components

# 

# \## Technologies Used

# 

# \- React.js

# \- JavaScript / JSX

# \- Tailwind CSS

# \- Vite

# \- React Router

# \- Browser localStorage

# 

# \## Application Routes

# 

# | Route | Description |

# | --- | --- |

# | `/` | Home page |

# | `/category/:slug` | Category-based article page |

# | `/article/:id` | Article detail and reading page |

# | `/bookmarks` | Saved/bookmarked articles |

# | `/search` | Search and filtering interface |

# 

# \## Project Structure

# 

# ```text

# src/

# ├── components/

# │   ├── article/

# │   └── common/

# ├── context/

# ├── data/

# ├── pages/

# ├── App.jsx

# ├── App.css

# ├── index.css

# └── main.jsx





Client-Side Features

Bookmarking



Articles can be bookmarked from the interface. Bookmark data is stored using the browser's localStorage, allowing saved articles to remain available after refreshing the page.



Dark / Light Theme



The application supports both dark and light themes. The selected theme is stored in localStorage so the preference persists across page refreshes.



Reading Preferences



Users can adjust reading preferences such as font size, font family, and line spacing while reading an article. These preferences are persisted using browser localStorage.



Search and Filtering



Users can search for articles and filter content based on news categories.



Responsive Design



The interface is designed to work across:



Desktop screens

Tablets

Mobile devices



The layout, navigation, article cards, reading interface, and other components adapt to different screen sizes.

