import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

export const Card: React.FC<CardProps> = ({ children, className = '' }) => {
  return (
    <div
      className={`bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-xl p-6 shadow-lg hover:shadow-emerald-500/10 hover:border-emerald-500/50 transition-all duration-300 flex flex-col ${className}`}
    >
      {children}
    </div>
  );
};