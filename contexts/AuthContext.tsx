import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  id: string;
  email: string;
  fullName: string;
  phone?: string;
  avatar?: string;
  createdAt: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, fullName: string, phone?: string) => Promise<void>;
  signOut: () => void;
  forgotPassword: (email: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check for existing session on mount
  useEffect(() => {
    checkExistingSession();
  }, []);

  const checkExistingSession = async () => {
    try {
      const savedUser = localStorage.getItem('finwise-user');
      const savedToken = localStorage.getItem('finwise-token');
      
      if (savedUser && savedToken) {
        // In a real app, you'd validate the token with your backend
        setUser(JSON.parse(savedUser));
      }
    } catch (error) {
      console.error('Session check failed:', error);
      // Clear invalid session data
      localStorage.removeItem('finwise-user');
      localStorage.removeItem('finwise-token');
    } finally {
      setIsLoading(false);
    }
  };

  const signIn = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      // Simulate API call - in real app, this would be an actual API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock user data - in real app, this would come from your backend
      const mockUser: User = {
        id: '1',
        email,
        fullName: 'Rahul Sharma',
        phone: '+91 98765 43210',
        createdAt: new Date().toISOString()
      };
      
      // Mock token - in real app, this would come from your backend
      const mockToken = 'mock-jwt-token-' + Date.now();
      
      // Save to localStorage (in real app, consider more secure storage)
      localStorage.setItem('finwise-user', JSON.stringify(mockUser));
      localStorage.setItem('finwise-token', mockToken);
      
      setUser(mockUser);
    } catch (error) {
      throw new Error('Sign in failed. Please check your credentials.');
    } finally {
      setIsLoading(false);
    }
  };

  const signUp = async (email: string, password: string, fullName: string, phone?: string) => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const newUser: User = {
        id: Date.now().toString(),
        email,
        fullName,
        phone,
        createdAt: new Date().toISOString()
      };
      
      const mockToken = 'mock-jwt-token-' + Date.now();
      
      localStorage.setItem('finwise-user', JSON.stringify(newUser));
      localStorage.setItem('finwise-token', mockToken);
      
      setUser(newUser);
    } catch (error) {
      throw new Error('Sign up failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const signOut = () => {
    localStorage.removeItem('finwise-user');
    localStorage.removeItem('finwise-token');
    setUser(null);
  };

  const forgotPassword = async (email: string) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    // In real app, this would send a password reset email
    console.log('Password reset email sent to:', email);
  };

  return (
    <AuthContext.Provider value={{
      user,
      isAuthenticated: !!user,
      isLoading,
      signIn,
      signUp,
      signOut,
      forgotPassword
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}