import React, { createContext, useContext, useState, useEffect } from 'react';

// Определение интерфейса пользователя
interface User {
  id: string;
  email: string;
  name: string;
  role: 'jobseeker' | 'employer';
}

// Определение интерфейса контекста аутентификации
interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string, role: 'jobseeker' | 'employer') => Promise<void>;
  logout: () => void;
}

// Создание контекста аутентификации
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Создание провайдера аутентификации
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Проверка аутентификации при загрузке
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  // Функция логина
  const login = async (email: string, password: string) => {
    try {
      // В реальном приложении здесь был бы запрос к API
      // Имитация успешного ответа
      const mockUser: User = {
        id: '1',
        email,
        name: email.split('@')[0],
        role: 'jobseeker',
      };
      
      setUser(mockUser);
      localStorage.setItem('user', JSON.stringify(mockUser));
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    }
  };

  // Функция регистрации
  const register = async (name: string, email: string, password: string, role: 'jobseeker' | 'employer') => {
    try {
      // В реальном приложении здесь был бы запрос к API
      // Имитация успешного ответа
      const mockUser: User = {
        id: '1',
        email,
        name,
        role,
      };
      
      setUser(mockUser);
      localStorage.setItem('user', JSON.stringify(mockUser));
    } catch (error) {
      console.error('Registration failed:', error);
      throw error;
    }
  };

  // Функция выхода
  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  const value = {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    register,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Хук для использования контекста аутентификации
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};