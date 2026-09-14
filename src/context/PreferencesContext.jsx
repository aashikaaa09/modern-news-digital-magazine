import React, { createContext, useContext, useState, useEffect } from 'react';

const PreferencesContext = createContext();

const defaultPreferences = {
  fontSize: 'md',     // 'sm', 'md', 'lg', 'xl'
  fontFamily: 'sans',  // 'sans', 'serif', 'mono'
  lineSpacing: 'relaxed' // 'normal', 'relaxed', 'loose'
};

export const PreferencesProvider = ({ children }) => {
  const [preferences, setPreferences] = useState(() => {
    try {
      const saved = localStorage.getItem('magazine_reading_prefs');
      return saved ? { ...defaultPreferences, ...JSON.parse(saved) } : defaultPreferences;
    } catch (e) {
      console.error('Failed to parse reading preferences from localStorage', e);
      return defaultPreferences;
    }
  });

  useEffect(() => {
    localStorage.setItem('magazine_reading_prefs', JSON.stringify(preferences));
  }, [preferences]);

  const updatePreference = (key, value) => {
    setPreferences(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const resetPreferences = () => {
    setPreferences(defaultPreferences);
  };

  return (
    <PreferencesContext.Provider value={{ preferences, updatePreference, resetPreferences }}>
      {children}
    </PreferencesContext.Provider>
  );
};

export const usePreferences = () => {
  const context = useContext(PreferencesContext);
  if (!context) {
    throw new Error('usePreferences must be used within a PreferencesProvider');
  }
  return context;
};
