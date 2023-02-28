import React from 'react';
import Image from 'next/image';
import { useUser } from '../../../UserProvider';

const ProfileDropdownSection: React.FC = () => {
  const { user, profile } = useUser();

  return (
    <>
      {profile && (
        <div className="flex w-full justify-between p-4">
          <div>
            <div className="flex text-lg">
              {profile.displayName ? profile.displayName : 'Beautiful Stranger'}
            </div>
            <div className="flex text-xs">{user.email}</div>
          </div>

          <div className="h-12 w-12 rounded-full border border-zinc-800">
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
                {user.displayName ? user.displayName[0] : 'U'}
              </span>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default ProfileDropdownSection;
