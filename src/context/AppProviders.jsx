import React from 'react';
import { ThemeProvider } from './ThemeContext';
import { BookmarkProvider } from './BookmarkContext';
import { PreferencesProvider } from './PreferencesContext';

export const AppProviders = ({ children }) => {
  return (
    <ThemeProvider>
      <BookmarkProvider>
        <PreferencesProvider>
          {children}
        </PreferencesProvider>
      </BookmarkProvider>
    </ThemeProvider>
  );
};
