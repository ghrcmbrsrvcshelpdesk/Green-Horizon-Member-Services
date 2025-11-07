import React from 'react';
import { NavLink } from 'react-router-dom';
import { ASSET_PATHS } from '../assets';

export const Header: React.FC = () => {
  const navLinkClasses = ({ isActive }: { isActive: boolean }) =>
    `px-4 py-2 rounded-md text-sm font-medium transition-colors ${
      isActive
        ? 'bg-emerald-500/10 text-emerald-400'
        : 'text-slate-400 hover:bg-slate-800/50 hover:text-white'
    }`;

  return (
    <header className="bg-slate-900/50 backdrop-blur-sm border-b border-slate-800 sticky top-0 z-40">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <img src={ASSET_PATHS.logo} alt="Green Horizon Logo" className="h-8 w-8 text-emerald-500" />
            <span className="ml-3 text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-sky-400">
              Green Horizon
            </span>
          </div>
          <nav className="flex items-center space-x-4">
            <NavLink to="/" className={navLinkClasses}>
              Participant
            </NavLink>
            <NavLink to="/admin" className={navLinkClasses}>
              Admin
            </NavLink>
            <NavLink to="/verification" className={navLinkClasses}>
              Verification
            </NavLink>
          </nav>
        </div>
      </div>
    </header>
  );
};
