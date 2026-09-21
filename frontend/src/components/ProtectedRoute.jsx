import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth, getUserRole } from '../context/AuthContext';

export const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user } = useAuth();
  
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  const role = getUserRole(user);

  if (allowedRoles && allowedRoles.length > 0 && !allowedRoles.includes(role)) {
    // Redirect to the user's appropriate role dashboard
    switch (role) {
      case 'ADMIN': return <Navigate to="/admin-dashboard" replace />;
      case 'MANAGER': return <Navigate to="/manager-dashboard" replace />;
      case 'STAFF': return <Navigate to="/staff-dashboard" replace />;
      case 'CUSTOMER': return <Navigate to="/customer-dashboard" replace />;
      default: return <Navigate to="/login" replace />;
    }
  }

  return children;
};
