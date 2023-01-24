import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from './auth.provider';

export const ProtectedRoute: React.FC = ({
  children,
}: {
  children: JSX.Element;
}) => {
  const auth = useAuth();
  const location = useLocation();
  if (auth.loading) {
    return <div className="p-4 italic">Authenticating...</div>;
  }
  return auth.user ? (
    children
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};
