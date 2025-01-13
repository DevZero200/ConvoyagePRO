import { createContext, useContext, useState, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';

interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  account_type: 'particulier' | 'professionnel';
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => void;
  register: (data: any) => void;
  logout: () => void;
  isAuthenticated: boolean;
}

// Données de test en mémoire
const TEST_USERS = [
  {
    id: 1,
    name: 'Test User',
    email: 'test@example.com',
    password: 'password123',
    phone: '+33123456789',
    account_type: 'particulier'
  }
];

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();

  const login = (email: string, password: string) => {
    const foundUser = TEST_USERS.find(
      u => u.email === email && u.password === password
    );

    if (foundUser) {
      const { password: _, ...userWithoutPassword } = foundUser;
      setUser(userWithoutPassword);
      navigate('/dashboard');
    } else {
      throw new Error('Email ou mot de passe incorrect');
    }
  };

  const register = (data: any) => {
    const newUser = {
      id: TEST_USERS.length + 1,
      ...data
    };
    TEST_USERS.push(newUser);
    
    const { password: _, ...userWithoutPassword } = newUser;
    setUser(userWithoutPassword);
    navigate('/dashboard');
  };

  const logout = () => {
    setUser(null);
    navigate('/');
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};