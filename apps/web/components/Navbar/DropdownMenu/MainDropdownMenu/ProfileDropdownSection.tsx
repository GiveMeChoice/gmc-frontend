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
    <div
      className={`m-2.5 mx-3 flex flex-col gap-y-2 rounded-sm border border-zinc-800 bg-secondary p-3 px-8`}
    >
      <div className="flex w-full items-start justify-between">
        <div>
          <div className="flex text-2xl">
            {profile && profile.displayName
              ? profile.displayName
              : 'Beautiful Stranger'}
          </div>
          <div className="w-full pl-0.5 text-sm">
            {user && user.email ? user.email : ''}
          </div>
        </div>

        <div
          className={`flex aspect-square h-12 w-12 cursor-pointer items-center justify-center rounded-full border border-zinc-800 bg-${
            getUserTheme(profile).base
          }`}
        >
          {user && user.photoURL ? (
            <img
              draggable={false}
              className="rounded-full"
              src={user.photoURL}
              referrerPolicy="no-referrer"
              alt="profile photo"
            />
          ) : (
            <span className="pb-0.5 text-2xl">
              {user && user.displayName ? user.displayName[0] : 'B'}
            </span>
          )}
        </div>
      </div>
      <div className="flex w-full justify-center">
        <button
          className={`rounded-sm border border-zinc-800 text-zinc-800 bg-${
            getUserTheme(profile).base
          } py-1 px-3 text-xs hover:bg-primary active:bg-primary-dark-10 dark:border-white`}
          onClick={() => {
            close();
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
