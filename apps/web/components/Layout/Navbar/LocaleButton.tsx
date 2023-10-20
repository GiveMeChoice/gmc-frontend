import React from 'react';
import { useUser } from '../../Context/UserProvider';

const LocaleButton: React.FC = () => {
  const { user, profile } = useUser();

  return (
    <button className="black flex aspect-square h-10 items-center justify-center rounded-full border border-black px-2 text-sm shadow-sm  hover:bg-secondary active:bg-secondary-dark-10 dark:border-white">
      <span>ENG</span>
    </button>
  );
};

export default LocaleButton;
