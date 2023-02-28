import { doc, getFirestore, setDoc } from 'firebase/firestore';
import React from 'react';
import { Theme } from '../../lib/theme';
import { useUser } from '../UserProvider';

const LocaleButton: React.FC = () => {
  const { user, profile } = useUser();

  const handleClick = async () => {
    const ref = doc(getFirestore(), 'users', user.uid);
    await setDoc(ref, {
      ...profile,
      theme:
        profile && profile.theme === Theme.GMC_DEFAULT
          ? Theme.GMC_DUNE
          : Theme.GMC_DEFAULT,
    });
  };
  return (
    <button
      className="black flex h-9 items-center justify-center rounded border  border-white px-2 text-sm hover:border-zinc-700 hover:bg-secondary  hover:bg-opacity-70 hover:underline hover:shadow-sm active:bg-opacity-100"
      onClick={handleClick}
    >
      <span>ENG - GBP</span>
    </button>
  );
};

export default LocaleButton;
