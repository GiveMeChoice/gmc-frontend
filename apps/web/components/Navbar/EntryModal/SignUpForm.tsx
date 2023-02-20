import React, { useState } from 'react';
import Image from 'next/image';
import cn from 'classnames';

const SignUpForm: React.FC = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [termsAgree, setTermsAgree] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  return (
    <div className="flex flex-col items-center gap-5 p-6">
      <span className="w-full pl-1 text-left text-xl">
        Create Your Free Account:
      </span>
      <button className="flex h-14 w-full items-center justify-center gap-3 rounded-md border border-secondary-dark-20 p-3 text-center hover:bg-secondary hover:bg-opacity-70 active:bg-opacity-100">
        <Image
          src={'/img/google.png'}
          width="30px"
          height={30}
          alt="Google Logo"
        />
        Sign up with Google
      </button>
      <button className="flex h-14 w-full items-center justify-center gap-3 rounded-md border border-secondary-dark-20 p-3 text-center hover:bg-secondary hover:bg-opacity-70 active:bg-opacity-100">
        <Image
          src={'/img/twitter.png'}
          width="30px"
          height={30}
          alt="Twitter Logo"
        />
        Sign up with Twitter
      </button>

      <div className="flex w-full items-center justify-around">
        <hr className="w-full" />
        <span className="mx-4 text-secondary-dark-50">or</span>
        <hr className="w-full" />
      </div>

      <div className="flex w-full justify-around gap-4">
        <input
          type="name"
          placeholder="First Name*"
          value={firstName}
          onChange={(e) => {
            setFirstName(e.target.value);
          }}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !loading) {
              // handleSubmit(e);
            }
          }}
          className="h-12 w-1/2 rounded-sm border border-secondary-dark-20 p-3 pl-5"
        />
        <input
          type="name"
          placeholder="Last Name*"
          value={lastName}
          onChange={(e) => {
            setLastName(e.target.value);
          }}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !loading) {
              // handleSubmit(e);
            }
          }}
          className="h-12 w-1/2 rounded-sm border border-secondary-dark-20 p-3 pl-5"
        />
      </div>
      <input
        type="email"
        placeholder="E-mail*"
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
        }}
        onKeyDown={(e) => {
          if (e.key === 'Enter' && !loading) {
            // handleSubmit(e);
          }
        }}
        className="h-12 w-full rounded-sm border border-secondary-dark-20 p-3 pl-5"
      />
      <input
        id="password"
        type="password"
        placeholder="Password*"
        value={password}
        onChange={(e) => {
          setPassword(e.target.value);
        }}
        onKeyDown={(e) => {
          if (e.key === 'Enter' && !loading) {
            // handleSubmit(e);
          }
        }}
        className="h-12 w-full rounded-sm border border-secondary-dark-20 p-3 pl-5"
      />
      <div className="flex w-full items-center gap-1.5 pl-1">
        <input
          type="checkbox"
          id="termsAgreeCheckbox"
          checked={termsAgree}
          title="I Agree to Terms and Conditions"
          onChange={() => setTermsAgree(!termsAgree)}
          className="h-3.5 w-3.5 rounded-sm border-gray-300 bg-gray-100 text-right text-primary focus:ring-2 focus:ring-primary"
        />
        <label htmlFor="termsAgreeCheckbox" className="text-sm text-zinc-700">
          I Agree to{' '}
          <a
            href="/terms"
            target="_blank"
            className="underline underline-offset-1"
          >
            Terms and Conditions
          </a>
        </label>
      </div>

      <button
        className="h-12 w-full rounded-md bg-zinc-800 text-center text-white hover:text-primary"
        disabled={loading}
        // onClick={handleSubmit}
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
          'Sign Up'
        )}
      </button>
      <div className={cn('flex items-center justify-center')}>
        {error && <span className="text-sm text-gmc-heart">{error}</span>}
      </div>
    </div>
  );
};

export default SignUpForm;
