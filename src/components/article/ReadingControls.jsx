import React from 'react';
import { Type, AlignLeft, SlidersHorizontal, RotateCcw } from 'lucide-react';
import { usePreferences } from '../../context/PreferencesContext';

export const ReadingControls = ({ className = '' }) => {
  const { preferences, updatePreference, resetPreferences } = usePreferences();

  return (
    <div className={`p-4 rounded-2xl bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 backdrop-blur-md shadow-sm dark:shadow-lg space-y-4 transition-colors duration-200 ${className}`}>
      <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-800 dark:text-slate-300">
          <SlidersHorizontal className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
          <span>Reading Preferences</span>
        </div>
        <button
          onClick={resetPreferences}
          title="Reset to default preferences"
          className="flex items-center gap-1 text-[11px] text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition"
        >
          <RotateCcw className="w-3 h-3" />
          <span>Reset</span>
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Font Size Selector */}
        <div className="space-y-1.5">
          <label className="text-[11px] font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
            <Type className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
            <span>Font Size</span>
          </label>
          <div className="grid grid-cols-4 gap-1 p-1 bg-slate-100 dark:bg-slate-950 rounded-lg border border-slate-200 dark:border-slate-800">
            {[
              { id: 'sm', label: 'S' },
              { id: 'md', label: 'M' },
              { id: 'lg', label: 'L' },
              { id: 'xl', label: 'XL' },
            ].map((size) => (
              <button
                key={size.id}
                onClick={() => updatePreference('fontSize', size.id)}
                className={`py-1 text-xs font-semibold rounded transition ${
                  preferences.fontSize === size.id
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-slate-800'
                }`}
              >
                {size.label}
              </button>
            ))}
          </div>
        </div>

        {/* Font Family Selector */}
        <div className="space-y-1.5">
          <label className="text-[11px] font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
            <Type className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
            <span>Font Family</span>
          </label>
          <div className="grid grid-cols-3 gap-1 p-1 bg-slate-100 dark:bg-slate-950 rounded-lg border border-slate-200 dark:border-slate-800">
            {[
              { id: 'sans', label: 'Sans' },
              { id: 'serif', label: 'Serif' },
              { id: 'mono', label: 'Mono' },
            ].map((family) => (
              <button
                key={family.id}
                onClick={() => updatePreference('fontFamily', family.id)}
                className={`py-1 text-xs font-semibold rounded transition ${
                  preferences.fontFamily === family.id
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-slate-800'
                }`}
              >
                {family.label}
              </button>
            ))}
          </div>
        </div>

        {/* Line Spacing Selector */}
        <div className="space-y-1.5">
          <label className="text-[11px] font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
            <AlignLeft className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
            <span>Line Spacing</span>
          </label>
          <div className="grid grid-cols-3 gap-1 p-1 bg-slate-100 dark:bg-slate-950 rounded-lg border border-slate-200 dark:border-slate-800">
            {[
              { id: 'normal', label: 'Compact' },
              { id: 'relaxed', label: 'Normal' },
              { id: 'loose', label: 'Loose' },
            ].map((spacing) => (
              <button
                key={spacing.id}
                onClick={() => updatePreference('lineSpacing', spacing.id)}
                className={`py-1 text-xs font-semibold rounded transition ${
                  preferences.lineSpacing === spacing.id
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-slate-800'
                }`}
              >
                {spacing.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReadingControls;
