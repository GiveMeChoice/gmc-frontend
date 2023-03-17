import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './auth/auth.provider';
import cn from 'classnames';
const GMCLogo = require('../assets/images/GMC_logo.svg');

const LoginScreen: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const auth = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (auth.user) {
      navigate('/');
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await auth.logIn(email, password);
      navigate('/');
    } catch (err) {
      setError('Sorry, we could not authenticate you. Try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      id="login-screen"
      className="flex h-screen w-screen items-center justify-center bg-secondary"
    >
      <div
        id="login-container"
        className="mx-8 mb-14 flex max-w-sm flex-col items-center space-y-5 rounded-md bg-white pt-20 pb-10 text-lg text-zinc-800 shadow-sm"
      >
        <div id="full-gmc-logo" className="w-3/4 pt-3 pb-5">
          <img className="opacity-90" src={GMCLogo} alt="GMC Logo Full" />
        </div>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !loading) {
              handleSubmit(e);
            }
          }}
          className="h-14 w-3/4 rounded-md border border-secondary-dark-20 p-3"
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
              handleSubmit(e);
            }
          }}
          className="h-14 w-3/4 rounded-md border border-secondary-dark-20 p-3"
        />
        <button
          className="h-14 w-3/4 rounded-md bg-zinc-800 text-center text-white hover:text-primary"
          disabled={loading}
          onClick={handleSubmit}
        >
          {loading ? (
            <svg
              role="status"
              className="mr-2 inline h-7 w-7 animate-spin fill-primary text-black"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
          ) : (
            'Log In'
          )}
        </button>
        <div
          className={cn(
            'h-16 w-3/4 rounded-md bg-opacity-20 p-1 px-2 text-center',
            {
              'bg-gmc-heart': error,
            }
          )}
        >
          {error && <span className="text-gmc-heart">{error}</span>}
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;
