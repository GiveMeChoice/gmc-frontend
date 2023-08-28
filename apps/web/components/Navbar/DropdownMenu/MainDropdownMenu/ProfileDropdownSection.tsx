import { useRouter } from 'next/router';
import React from 'react';
import { getUserTheme } from '../../../../lib/theme';
import { useUser } from '../../../UserProvider';

interface Props {
  close: () => void;
}

const ProfileDropdownSection: React.FC<Props> = ({ close }) => {
  const { user, profile } = useUser();
  const router = useRouter();

  return (
    <div className="relative flex flex-col items-center gap-y-3 border-b-1.5 border-secondary-dark-10 py-4">
      <button
        className="absolute top-3.5 right-3.5 flex aspect-square h-9 flex-col items-center justify-center rounded-full pt-0.5 hover:scale-[1.03] hover:bg-secondary-dark-10"
        onClick={close}
      >
        <div className="w-4 -translate-x-[0px] rotate-45 border-b-1.5 border-zinc-600" />
        <div className="w-4 translate-x-[0px] -translate-y-[2px] -rotate-45 border-b-1.5 border-zinc-600" />
      </button>
      <div className="w-full px-3 text-center text-xl">
        {profile && profile.displayName
          ? profile.displayName
          : 'Beautiful Stranger'}
      </div>
      <div
        className={`flex aspect-square h-14 w-14 cursor-pointer items-center justify-center rounded-full border border-zinc-800 bg-${
          getUserTheme(profile).base
        }`}
      >
        {user.photoURL ? (
          <img
            draggable={false}
            className="rounded-full"
            src={user.photoURL}
            referrerPolicy="no-referrer"
            alt="profile photo"
          />
        ) : (
          <span className="text-center text-3xl">
            {user.displayName ? user.displayName[0] : 'B'}
          </span>
        )}
      </div>
      <div className="w-full px-3 text-center text-sm">{user.email}</div>
      <button
        className={`rounded-lg border border-zinc-800 text-zinc-800 bg-${
          getUserTheme(profile).base
        } py-1.5 px-3.5 text-sm hover:bg-secondary active:bg-secondary-dark-10 dark:border-white`}
        onClick={() => {
          close();
          if (router.pathname === '/profile') {
            router.reload();
          } else {
            router.push('/profile');
          }
        }}
      >
        Manage Profile
      </button>
    </div>
  );
};

export default ProfileDropdownSection;
