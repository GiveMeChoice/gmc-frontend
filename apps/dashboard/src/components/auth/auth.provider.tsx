import screensService from '@root/services/screens.service';
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  User,
} from 'firebase/auth';
import { doc, getDoc, onSnapshot } from 'firebase/firestore';
import React, { createContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, firestore } from '../../firebase';

interface IAuthContext {
  user?: User;
  setUser: (user: any) => void;
  logIn: (email: string, password: string) => void;
  logOut: () => void;
  loading: boolean;
  profile: IProfile;
}

interface IProfile {
  displayName: string;
  dashboardAccess: boolean;
}

const AuthContext = createContext<IAuthContext>(null!);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User>();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState<IProfile>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        // register profile listener
        const ref = doc(firestore, 'users', currentUser.uid);
        const unsub = onSnapshot(ref, (doc) => {
          let profileDoc = doc.data() as IProfile;
          if (!profileDoc || !profileDoc.dashboardAccess) {
            logOut();
          } else {
            setProfile(profileDoc);
            navigate('/');
          }
        });
      } else {
        setProfile(null);
        if (!screensService.isActivePath('/login')) {
          navigate('/');
        }
      }
      setLoading(false);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const logIn = async (email: string, password: string) => {
    console.log('logging in');
    const cred = await signInWithEmailAndPassword(auth, email, password);
    const docSnap = await getDoc(doc(firestore, `users/${cred.user.uid}`));
    if (!docSnap.exists) {
      console.log('error1');
      throw new Error('no profile!');
    } else {
      const profile = docSnap.data();
      if (!profile || !profile.dashboardAccess) {
        console.log('error2');
        throw new Error('no dashboard auth!');
      }
    }
  };

  const logOut = async () => {
    return signOut(auth);
  };

  const value = { user, setUser, logIn, logOut, loading, profile };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => React.useContext(AuthContext);
