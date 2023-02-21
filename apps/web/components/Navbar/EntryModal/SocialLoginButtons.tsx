import { signInWithPopup } from 'firebase/auth';
import Image from 'next/image';
import React from 'react';
import { auth, firestore, googleAuthProvider } from '../../../lib/firebase';
import cn from 'classnames';
import { doc, getDoc, setDoc } from 'firebase/firestore';

interface Props {
  loading: boolean;
}

const SocialLoginButtons: React.FC<Props> = ({ loading }) => {
  const loginWithGoogle = async () => {
    const cred = await signInWithPopup(auth, googleAuthProvider);
    const userDocRef = await doc(firestore, `users/${cred.user.uid}`);
    const docSnap = await getDoc(userDocRef);
    if (!docSnap.exists()) {
      setDoc(userDocRef, {
        displayName: cred.user.displayName,
      });
    }
    console.log('from google: ', cred);
  };

  return (
    <div className="flex w-full flex-col gap-4">
      <button
        disabled={loading}
        className={cn(
          'flex h-14 items-center justify-center gap-3 rounded-md border border-secondary-dark-20 p-3 text-center',
          {
            'hover:bg-secondary hover:bg-opacity-70 active:bg-opacity-100':
              !loading,
          }
        )}
        onClick={loginWithGoogle}
      >
        <Image
          src={'/img/google.png'}
          width="30px"
          height={30}
          alt="Google Logo"
        />
        Continue with Google
      </button>
      <button
        disabled={loading}
        className={cn(
          'flex h-14 items-center justify-center gap-3 rounded-md border border-secondary-dark-20 p-3 text-center',
          {
            'hover:bg-secondary hover:bg-opacity-70 active:bg-opacity-100':
              !loading,
          }
        )}
      >
        <Image
          src={'/img/twitter.png'}
          width="30px"
          height={30}
          alt="Twitter Logo"
        />
        Continue with Twitter
      </button>
    </div>
  );
};

export default SocialLoginButtons;
