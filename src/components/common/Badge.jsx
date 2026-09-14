import React from 'react';

const colorStyles = {
  indigo: 'bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border-indigo-500/20 hover:bg-indigo-500/20',
  emerald: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20 hover:bg-emerald-500/20',
  cyan: 'bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border-cyan-500/20 hover:bg-cyan-500/20',
  amber: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20 hover:bg-amber-500/20',
  rose: 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20 hover:bg-rose-500/20',
  purple: 'bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20 hover:bg-purple-500/20',
  slate: 'bg-slate-500/10 text-slate-700 dark:text-slate-300 border-slate-500/20 hover:bg-slate-500/20',
};

export const Badge = ({ children, color = 'indigo', size = 'sm', className = '', onClick }) => {
  const sizeClasses = size === 'xs' 
    ? 'px-2 py-0.5 text-[10px]' 
    : size === 'md' 
    ? 'px-3.5 py-1 text-sm' 
    : 'px-2.5 py-0.5 text-xs';

  const style = colorStyles[color] || colorStyles.slate;

  const baseClasses = `inline-flex items-center font-semibold rounded-full border tracking-wide uppercase transition-colors ${sizeClasses} ${style} ${className}`;

  if (onClick) {
    return (
      <button onClick={onClick} className={`${baseClasses} cursor-pointer`}>
        {children}
      </button>
    );
  }

  return <span className={baseClasses}>{children}</span>;
};

export default Badge;
