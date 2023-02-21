import React, { useState } from 'react';
import Modal from 'react-responsive-modal';
import cn from 'classnames';
import SignUpForm from './EntryModal/SignUpForm';
import LoginForm from './EntryModal/LoginForm';

interface Props {
  open: boolean;
  onClose: () => void;
}

const EntryModal: React.FC<Props> = ({ open, onClose }) => {
  const [signUpForm, setSignUpForm] = useState(false);
  return (
    <Modal
      open={open}
      onClose={() => {
        onClose();
      }}
      onAnimationEnd={() => {
        setSignUpForm(false);
      }}
      center
      styles={{
        modal: {
          padding: 0,
          width: '90%',
          maxWidth: '500px',
          height: 'fit-content',
        },
      }}
      classNames={{
        modal: 'customModal',
        modalContainer: 'customModalContainer',
        closeButton: 'customModalCloseButton',
      }}
    >
      <div className="flex max-w-5xl flex-col">
        <div className="flex h-14 w-full">
          <button
            className={cn('w-1/2', {
              'bg-secondary text-secondary-dark-50': signUpForm,
            })}
            onClick={() => setSignUpForm(false)}
          >
            Log In
          </button>
          <button
            className={cn('w-1/2', {
              'bg-secondary text-secondary-dark-50': !signUpForm,
            })}
            onClick={() => setSignUpForm(true)}
          >
            Sign Up
          </button>
          <div
            className={cn('w-8', {
              'bg-secondary': !signUpForm,
            })}
          ></div>
        </div>
        {signUpForm ? (
          <SignUpForm moveToLogin={() => setSignUpForm(false)} />
        ) : (
          <LoginForm moveToSignUp={() => setSignUpForm(true)} />
        )}
      </div>
    </Modal>
  );
};

export default EntryModal;
