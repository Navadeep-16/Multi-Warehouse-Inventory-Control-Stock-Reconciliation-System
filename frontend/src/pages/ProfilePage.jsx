import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function ProfilePage() {
  const navigate = useNavigate();
  const { user } = useAuth();

  return (
    <div className="space-y-6">
      <div>
        <div className="flex items-center gap-2 text-xs text-muted mb-1">
          <span className="hover:text-foreground cursor-pointer" onClick={() => navigate('/dashboard')}>Dashboard</span>
          <span>/</span>
          <span className="text-primary font-medium">My Profile</span>
        </div>
        <div>
          <h1 className="text-2xl font-bold text-foreground tracking-tight">Operator Profile & Identity</h1>
          <p className="text-sm text-muted">User security settings, assigned role permissions, and active warehouse shift.</p>
        </div>
      </div>

      <div className="bg-surface border border-border rounded-2xl p-6 max-w-xl space-y-4">
        <div className="flex items-center gap-4 border-b border-border pb-4">
          <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-primary to-secondary flex items-center justify-center text-background text-2xl font-bold">
            {(user?.sub || user?.username || 'O')[0].toUpperCase()}
          </div>
          <div>
            <h2 className="text-lg font-bold text-foreground">{user?.sub || user?.username || 'Staff Operator'}</h2>
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-primary/20 text-primary border border-primary/30 uppercase">
              Role: {user?.role || 'STAFF'}
            </span>
          </div>
        </div>

        <div className="space-y-3 text-xs">
          <div className="flex justify-between py-1 border-b border-border/50">
            <span className="text-muted">Assigned Facility:</span>
            <span className="text-foreground font-semibold">WH-EAST (New York Logistics Hub)</span>
          </div>
          <div className="flex justify-between py-1 border-b border-border/50">
            <span className="text-muted">Security Access Level:</span>
            <span className="text-primary font-bold">{user?.role || 'STAFF'}</span>
          </div>
          <div className="flex justify-between py-1 border-b border-border/50">
            <span className="text-muted">Authentication Mode:</span>
            <span className="text-foreground font-medium">JWT Secure Session</span>
          </div>
        </div>
      </div>
    </div>
  );
}
