import cn from 'classnames';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { formatErrorMessage } from 'helpers';
import Image from 'next/image';
import React, { useState } from 'react';
import { LoadingSpinner } from 'ui';
import { auth } from '../../../../lib/firebase';
import SocialLoginButtons from './SocialLoginButtons';

interface Props {
  moveToSignUp: () => void;
  onLoginSuccess: () => void;
}

const LoginForm: React.FC<Props> = ({ moveToSignUp, onLoginSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const submitPasswordLogin = async () => {
    try {
      setLoading(true);
      const cred = await signInWithEmailAndPassword(auth, email, password);
      onLoginSuccess();
    } catch (err) {
      setError(formatErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center gap-5 p-6">
      <Image src="/img/GMC_LOGO.svg" alt="GMC Logo" height="70" width="380" />
      <input
        type="email"
        placeholder="E-mail"
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
        }}
        onKeyDown={(e) => {
          if (e.key === 'Enter' && !loading) {
            submitPasswordLogin();
          }
        }}
        className="h-12 w-full rounded-sm border border-secondary-dark-20 p-3 pl-5"
      />
      <input
        id="password"
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => {
          setPassword(e.target.value);
        }}
        onKeyDown={(e) => {
          if (e.key === 'Enter' && !loading) {
            submitPasswordLogin();
          }
        }}
        className="h-12 w-full rounded-sm border border-secondary-dark-20 p-3 pl-5"
      />
      <div className="flex w-full items-center justify-between px-1 pb-1">
        <div className="flex items-center gap-1">
          <input
            type="checkbox"
            id="rememberMeCheckbox"
            checked={rememberMe}
            title="Remember Me"
            onChange={() => setRememberMe(!rememberMe)}
            className="h-3.5 w-3.5 rounded-sm border-gray-300 bg-gray-100 text-right text-primary focus:ring-2 focus:ring-primary"
          />
          <label htmlFor="rememberMeCheckbox" className="text-sm text-zinc-700">
            Remember Me?
          </label>
        </div>
        <span className="cursor-pointer text-sm text-zinc-700 underline">
          I forgot my password
        </span>
      </div>
      <button
        className={cn(
          'h-12 w-full rounded-md bg-zinc-800 text-center text-white',
          {
            'hover:bg-opacity-95 active:text-primary': !loading,
          }
        )}
        disabled={loading}
        onClick={() => submitPasswordLogin()}
      >
        {loading ? (
          <LoadingSpinner style="h-8 fill-primary text-secondary-dark-40" />
        ) : (
          'Log In'
        )}
      </button>
      {error && (
        <div className={cn('flex items-center justify-center')}>
          <span className="text-sm text-gmc-heart">{error}</span>
        </div>
      )}

      <div className="flex w-full items-center justify-around">
        <hr className="w-full" />
        <span className="mx-4 text-sm text-secondary-dark-50">or</span>
        <hr className="w-full" />
      </div>

      <SocialLoginButtons loading={loading} />

      <p className="py-2 text-sm text-secondary-dark-50">
        New to Give Me Choice?{' '}
        <span className="cursor-pointer underline" onClick={moveToSignUp}>
          Sign Up
        </span>
      </p>
    </div>
  );
};

export default LoginForm;
