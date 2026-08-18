import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface UserSession {
  id: string;
  name: string;
  role: string;
  permissions: string[];
}

interface AuthContextType {
  session: UserSession | null;
  login: (username: string) => void;
  logout: () => void;
  hasPermission: (permission: string) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [session, setSession] = useState<UserSession | null>(null);

  const login = (username: string) => {
    // Dummy authentication implementation
    setSession({
      id: 'usr_123',
      name: username,
      role: username === 'admin' ? 'Administrator' : 'Staff',
      permissions: ['view:dashboard', 'edit:profile']
    });
  };

  const logout = () => {
    setSession(null);
  };

  const hasPermission = (permission: string) => {
    if (!session) return false;
    // Admins have all permissions in this dummy setup
    if (session.role === 'Administrator') return true;
    return session.permissions.includes(permission);
  };

  return (
    <AuthContext.Provider value={{ session, login, logout, hasPermission }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
