import React, { createContext, useContext, useReducer, useState, useCallback, useEffect } from 'react';
import { AuthService } from '../services/authService';

export const AppContext = createContext();
export const useApp = () => useContext(AppContext);

const appReducer = (state, action) => {
  switch (action.type) {
    case 'SET_USER':
      return { ...state, user: action.payload, isAuthenticated: !!action.payload };
    case 'LOGOUT':
      AuthService.logout();
      return { ...state, user: null, isAuthenticated: false };
    default:
      return state;
  }
};

export const AppProvider = ({ children }) => {
  const initialUser = AuthService.getCurrentUser();
  const [state, dispatch] = useReducer(appReducer, {
    user: initialUser,
    isAuthenticated: !!initialUser
  });

  const [toasts, setToasts] = useState([]);
  
  const addToast = useCallback((msg, type = 'success') => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message: msg, type }]);
    setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 4000);
  }, []);

  const loginUser = async (email, password) => {
      try {
          const user = await AuthService.login(email, password);
          dispatch({ type: 'SET_USER', payload: user });
          addToast(`Welcome back, ${user.name}`, 'success');
          return user;
      } catch (error) {
          addToast(error.message, 'error');
          throw error;
      }
  };

  const logoutUser = () => {
      dispatch({ type: 'LOGOUT' });
      addToast('Securely logged out', 'success');
  };

  return (
    <AppContext.Provider value={{ state, dispatch, addToast, loginUser, logoutUser }}>
      <div className="toast-container" style={{ position: 'fixed', bottom: '2rem', right: '2rem', zIndex: 9999, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {toasts.map(t => (
          <div key={t.id} style={{ 
            background: 'white', borderRadius: '12px', padding: '1rem 1.5rem', display: 'flex', alignItems: 'center', gap: '1rem', 
            boxShadow: '0 12px 32px rgba(0,0,0,0.1)', fontWeight: 500, fontSize: '0.95rem', animation: 'slideUp 0.3s cubic-bezier(0.25, 1, 0.5, 1)', 
            borderLeft: `4px solid ${t.type === 'success' ? '#138808' : '#DC2626'}`
          }}>
             {t.message}
          </div>
        ))}
      </div>
      {children}
    </AppContext.Provider>
  );
};
