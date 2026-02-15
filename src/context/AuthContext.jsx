import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  // Load user from session storage on mount
  useEffect(() => {
    const savedUser = sessionStorage.getItem('learnstackhub_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  // Login with email
  const login = (email, name) => {
    const userData = {
      email,
      name: name || email.split('@')[0],
      loginTime: new Date().toISOString()
    };
    setUser(userData);
    sessionStorage.setItem('learnstackhub_user', JSON.stringify(userData));
    setIsLoginModalOpen(false);
    return userData;
  };

  // Logout
  const logout = () => {
    setUser(null);
    sessionStorage.removeItem('learnstackhub_user');
  };

  // Check if user is logged in
  const isLoggedIn = () => {
    return user !== null;
  };

  // Open login modal
  const openLoginModal = () => {
    setIsLoginModalOpen(true);
  };

  // Close login modal
  const closeLoginModal = () => {
    setIsLoginModalOpen(false);
  };

  return (
    <AuthContext.Provider value={{
      user,
      login,
      logout,
      isLoggedIn,
      isLoginModalOpen,
      openLoginModal,
      closeLoginModal
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}

export default AuthContext;




