import React, { useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Search, Bell, User, Sun, Moon, ChevronRight, LogOut, Settings, UserCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const TopBar = () => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const [theme, setTheme] = useState('dark');
  const [profileOpen, setProfileOpen] = useState(false);

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    document.documentElement.classList.toggle('dark');
    // Note: In a real app, save to localStorage and Tailwind config
  };

  // Generate breadcrumbs from path
  const pathnames = location.pathname.split('/').filter((x) => x);

  return (
    <header className="h-16 border-b border-border bg-surface/80 backdrop-blur flex items-center justify-between px-8 sticky top-0 z-20">
      {/* Breadcrumbs */}
      <div className="flex items-center text-sm text-muted capitalize overflow-hidden whitespace-nowrap hidden md:flex min-w-[200px]">
        <Link to="/dashboard" className="hover:text-primary transition-colors">Home</Link>
        {pathnames.map((value, index) => {
          const last = index === pathnames.length - 1;
          const to = `/${pathnames.slice(0, index + 1).join('/')}`;
          return (
            <React.Fragment key={to}>
              <ChevronRight className="w-4 h-4 mx-2 text-border flex-shrink-0" />
              {last ? (
                <span className="text-foreground font-medium truncate max-w-[150px]">{value.replace('-', ' ')}</span>
              ) : (
                <Link to={to} className="hover:text-primary transition-colors truncate max-w-[100px]">{value.replace('-', ' ')}</Link>
              )}
            </React.Fragment>
          );
        })}
      </div>

      {/* Global Search */}
      <div className="flex-1 max-w-xl relative group mx-6">
        <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted group-focus-within:text-primary transition-colors" />
        <input 
          type="text" 
          placeholder="Search inventory, POs, SKUs, or scans barcode..." 
          className="w-full bg-surface-elevated border border-border rounded-lg pl-10 pr-16 py-2 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/50 transition-all text-foreground placeholder:text-muted"
        />
        <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1 text-[10px] text-muted font-mono bg-surface border border-border px-1.5 py-0.5 rounded">
          <span>⌘</span><span>K</span>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-4 flex-shrink-0">
        <button onClick={toggleTheme} className="p-2 text-muted hover:text-foreground hover:bg-surface-elevated rounded-lg transition-all">
          {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
        </button>

        <button className="relative p-2 text-muted hover:text-foreground hover:bg-surface-elevated rounded-lg transition-all">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1.5 right-2 w-2 h-2 bg-danger rounded-full border border-surface"></span>
        </button>
        
        {/* Profile Menu */}
        <div className="relative pl-4 border-l border-border ml-2">
          <div 
            className="flex items-center gap-3 cursor-pointer p-1.5 hover:bg-surface-elevated rounded-lg transition-all"
            onClick={() => setProfileOpen(!profileOpen)}
          >
            <div className="text-right hidden sm:block">
              <div className="text-sm font-medium text-foreground">{user?.username || 'Operator'}</div>
              <div className="text-[10px] tracking-widest uppercase text-muted font-heading">{user?.role || 'System'}</div>
            </div>
            <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-primary to-secondary flex items-center justify-center text-background shadow-md">
              <span className="font-bold text-sm">{(user?.username || 'O')[0].toUpperCase()}</span>
            </div>
          </div>

          {/* Dropdown */}
          {profileOpen && (
            <div className="absolute right-0 top-full mt-2 w-56 bg-surface border border-border rounded-xl shadow-2xl overflow-hidden py-1 animate-in fade-in slide-in-from-top-2">
              <div className="px-4 py-3 border-b border-border bg-surface-elevated/50 sm:hidden">
                <div className="text-sm font-medium text-foreground">{user?.username || 'Operator'}</div>
                <div className="text-[10px] tracking-widest uppercase text-muted font-heading">{user?.role || 'System'}</div>
              </div>
              <Link to="/profile" className="flex items-center gap-3 px-4 py-2.5 text-sm text-foreground hover:bg-surface-elevated transition-colors" onClick={() => setProfileOpen(false)}>
                <UserCircle className="w-4 h-4 text-muted" /> My Profile
              </Link>
              <Link to="/settings" className="flex items-center gap-3 px-4 py-2.5 text-sm text-foreground hover:bg-surface-elevated transition-colors" onClick={() => setProfileOpen(false)}>
                <Settings className="w-4 h-4 text-muted" /> Preferences
              </Link>
              <div className="h-px bg-border my-1"></div>
              <button 
                onClick={() => { setProfileOpen(false); logout(); }}
                className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-danger hover:bg-danger/10 transition-colors text-left font-medium"
              >
                <LogOut className="w-4 h-4" /> Sign Out Session
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
