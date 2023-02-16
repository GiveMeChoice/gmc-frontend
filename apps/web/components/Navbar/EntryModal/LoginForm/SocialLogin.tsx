import React from 'react';
import Image from 'next/image';
import { signInWithPopup } from 'firebase/auth';
import { auth, googleAuthProvider } from '../../../../lib/firebase';
import { useRouter } from 'next/router';

interface Props {}

const SocialLogin: React.FC<Props> = () => {
  const router = useRouter();

  const loginWithGoogle = async () => {
    console.log('signing in with google');
    const result = await signInWithPopup(auth, googleAuthProvider);
    console.log('sign in completed: ', result);
  };

  return (
    <div className="flex gap-4">
      <button
        className="flex h-14 items-center justify-center gap-3 rounded-md border border-secondary-dark-20 p-3 text-center hover:bg-secondary hover:bg-opacity-70 active:bg-opacity-100"
        onClick={loginWithGoogle}
      >
        <Image
          src={'/img/google.png'}
          width="30px"
          height={30}
          alt="Google Logo"
        />
        Log in with Google
      </button>
      <button className="flex h-14 items-center justify-center gap-3 rounded-md border border-secondary-dark-20 p-3 text-center hover:bg-secondary hover:bg-opacity-70 active:bg-opacity-100">
        <Image
          src={'/img/twitter.png'}
          width="30px"
          height={30}
          alt="Twitter Logo"
        />
        Log in with Twitter
      </button>
    </div>
  );
};

export default SocialLogin;
