import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center p-6 space-y-4">
      <span className="text-6xl font-extrabold text-primary font-mono tracking-widest">404</span>
      <h1 className="text-2xl font-bold text-foreground">Page Not Found</h1>
      <p className="text-sm text-muted max-w-md">
        The requested NEXORA inventory page does not exist or has been relocated.
      </p>
      <button
        onClick={() => navigate('/dashboard')}
        className="px-6 py-2.5 bg-primary text-surface-dark font-bold rounded-xl text-xs hover:bg-primary-hover shadow-lg transition"
      >
        Go to Dashboard
      </button>
    </div>
  );
}
