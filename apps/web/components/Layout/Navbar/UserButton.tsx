import React from 'react';
import ProfileButton from './ProfileButton';
import LoginButton from './LoginButton';
import { useUser } from '../../Context/UserProvider';

const UserButton: React.FC = () => {
  const { user } = useUser();

  return user ? <ProfileButton /> : <LoginButton />;
};

export default UserButton;
