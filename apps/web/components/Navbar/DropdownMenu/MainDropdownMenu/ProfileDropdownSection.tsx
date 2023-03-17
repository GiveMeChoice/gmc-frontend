import { useRouter } from 'next/router';
import React from 'react';
import { useUser } from '../../../UserProvider';

const ProfileDropdownSection: React.FC = () => {
  const { user, profile } = useUser();
  const router = useRouter();

  return (
    <div className="flex flex-col gap-3 px-4 pt-3.5 pb-2.5">
      <div className="flex w-full justify-between">
        <div>
          <div className="flex text-lg">
            {profile && profile.displayName
              ? profile.displayName
              : 'Beautiful Stranger'}
          </div>
          <div className="flex pl-0.5 text-xs">{user.email}</div>
        </div>

        <div className="flex h-12 w-12 items-center justify-center rounded-full border border-zinc-800">
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
      <div className="flex w-full justify-center">
        <button
          className="rounded-md border border-black p-1 px-3 text-sm hover:bg-zinc-700 hover:bg-opacity-10 active:bg-zinc-600 active:bg-opacity-20 dark:border-white"
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
