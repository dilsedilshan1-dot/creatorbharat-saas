import React from 'react';
import { Navigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';

export const ProtectedRoute = ({ children, requireRole }) => {
    const { state, addToast } = useApp();

    if (!state.isAuthenticated) {
        addToast('Please login to access secure systems.', 'error');
        return <Navigate to="/" replace />;
    }

    if (requireRole && state.user?.role !== requireRole) {
        addToast(`Restricted. Access strictly requires ${requireRole} privileges.`, 'error');
        return <Navigate to="/dashboard" replace />;
    }

    return children;
};
