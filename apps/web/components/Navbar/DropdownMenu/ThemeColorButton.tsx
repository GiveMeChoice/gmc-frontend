import { doc, getFirestore, setDoc } from 'firebase/firestore';
import React from 'react';
import { getTheme, Theme } from '../../../lib/theme';
import { useUser } from '../../UserProvider';
import cn from 'classnames';

interface Props {
  color: string;
  theme: Theme;
  title: string;
}

const ThemeColorButton: React.FC<Props> = ({ color, theme, title }) => {
  const { user, profile } = useUser();

  const handleSelectTheme = async () => {
    const ref = doc(getFirestore(), 'users', user.uid);
    await setDoc(ref, {
      ...profile,
      theme,
    });
  };

  const isActive = () => {
    return (
      ((!profile || !profile.theme) && theme === Theme.GMC_DEFAULT) ||
      (profile && profile.theme && profile.theme === theme)
    );
  };
  return (
    <div
      title={title}
      className={cn(
        `h-10 w-10 cursor-pointer rounded-full border-1.5 border-zinc-800 shadow-sm duration-150 hover:scale-105 bg-${
          getTheme(theme).modal
        }`,
        {
          'scale-105': isActive(),
        }
      )}
      onClick={handleSelectTheme}
    >
      <div
        className={cn('h-full w-full rounded-full', {
          'border-2 border-primary': isActive(),
        })}
      />
    </div>
  );
};

export default ThemeColorButton;
