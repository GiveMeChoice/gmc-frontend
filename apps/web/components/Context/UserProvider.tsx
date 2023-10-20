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
import { auth } from '../../lib/firebase';
import { getUserTheme } from '../../lib/theme';
import { IProfile, Theme } from 'gmc-types';

export interface IUserContext {
  user: User;
  loading: boolean;
  error: any;
  profile: IUserProfile;
}

export interface IUserProfile {
  displayName: string;
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
        console.log('snapshot listneer registered');
        let profileDoc = doc.data() as IUserProfile;
        setProfile(profileDoc);
        if (getUserTheme(profileDoc).dark) {
          document.documentElement.classList.add('dark');
        } else {
          document.documentElement.classList.remove('dark');
        }
      });
    } else {
      document.documentElement.classList.remove('dark');
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
