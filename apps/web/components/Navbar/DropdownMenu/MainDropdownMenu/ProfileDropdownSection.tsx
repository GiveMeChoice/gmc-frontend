import { useRouter } from 'next/router';
import React from 'react';
import { getUserTheme } from '../../../../lib/theme';
import { useUser } from '../../../UserProvider';

const ProfileDropdownSection: React.FC = () => {
  const { user, profile } = useUser();
  const router = useRouter();

  return (
    <div
      className={`mt-3 flex flex-col rounded-md border border-black p-3 bg-${
        getUserTheme(profile).modal
      }`}
    >
      <div className="bg- flex w-full items-center justify-between">
        <div>
          <div className="flex text-2xl">
            {profile && profile.displayName
              ? profile.displayName
              : 'Beautiful Stranger'}
          </div>
        </div>

        <div
          className={`flex aspect-square h-12 w-12 cursor-pointer items-center justify-center rounded-full border border-zinc-800 bg-${
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
            <span className="pb-0.5 text-2xl">
              {user.displayName ? user.displayName[0] : 'B'}
            </span>
          )}
        </div>
      </div>
      <div className="w-full pl-0.5 pb-3.5 text-sm">{user.email}</div>
      <div className="flex w-full justify-center">
        <button
          className={`rounded-md border border-black bg-${
            getUserTheme(profile).base
          } py-1 px-4 text-sm hover:bg-zinc-700 hover:bg-opacity-10 active:bg-zinc-600 active:bg-opacity-20 dark:border-white`}
          onClick={() => {
            if (router.pathname === '/profile') {
              router.reload();
            } else {
              router.push('/profile');
            }
          }}
        >
          Edit Profile
        </button>
      </div>
    </div>
  );
};

export default ProfileDropdownSection;
