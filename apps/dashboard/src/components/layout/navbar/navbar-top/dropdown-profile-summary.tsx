/* eslint-disable @next/next/no-img-element */
import { useAuth } from '@root/components/auth/auth.provider';
import React from 'react';

const DropdownProfileSummary: React.FC = () => {
  const auth = useAuth();
  return (
    <div
      className={`flex flex-col rounded-md border border-black bg-secondary-dark-10 p-3`}
    >
      <div className="flex w-full items-center justify-between">
        <div>
          <div className="flex text-2xl">
            {auth.profile && auth.profile.displayName
              ? auth.profile.displayName
              : 'Beautiful Stranger'}
          </div>
        </div>

        <div
          className={`bg- flex aspect-square h-12 w-12 cursor-pointer items-center justify-center rounded-full border border-zinc-800`}
        >
          {auth.user.photoURL ? (
            <img
              draggable={false}
              className="rounded-full"
              src={auth.user.photoURL}
              referrerPolicy="no-referrer"
              alt="profile photo"
            />
          ) : (
            <span className="pb-0.5 text-2xl">
              {auth.user.displayName ? auth.user.displayName[0] : 'B'}
            </span>
          )}
        </div>
      </div>
      <div className="w-full pl-0.5 pb-3.5 text-sm">{auth.user.email}</div>
    </div>
  );
};

export default DropdownProfileSummary;
