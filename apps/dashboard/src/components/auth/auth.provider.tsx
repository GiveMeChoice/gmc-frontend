import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  User,
} from 'firebase/auth';
import React, { createContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../../firebase';

interface IAuthContextType {
  user?: User;
  setUser: (user: any) => void;
  logIn: (email: string, password: string) => void;
  logOut: () => void;
  loading: boolean;
}

const AuthContext = createContext<IAuthContextType>(null!);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User>();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setLoading(false);
      setUser(currentUser);
      if (currentUser) {
        navigate('/');
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const logIn = async (email: string, password: string) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const logOut = async () => {
    return signOut(auth);
  };

  const value = { user, setUser, logIn, logOut, loading };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => React.useContext(AuthContext);
