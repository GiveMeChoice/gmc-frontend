import { User } from 'firebase/auth';
import { doc, getFirestore, onSnapshot } from 'firebase/firestore';
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../lib/firebase';
import { Theme } from '../lib/theme';

export interface IUserContext {
  user: User;
  loading: boolean;
  error: any;
  profile: IUserProfile;
}

export interface IUserProfile {
  theme: Theme;
}

const UserContext = createContext<IUserContext>(null);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, loading, error] = useAuthState(auth, {});
  const [profile, setProfile] = useState<IUserProfile>(null);

  useEffect(() => {
    console.log('user changed: ', user);
    let unsubscribe;
    if (user) {
      const ref = doc(getFirestore(), 'users', user.uid);
      unsubscribe = onSnapshot(ref, (doc) => {
        setProfile(doc.data() as IUserProfile);
      });
      console.log('profile: ', profile);
    } else {
      setProfile(null);
    }
  }, [user]);

  return (
    <UserContext.Provider value={{ user, loading, error, profile }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
