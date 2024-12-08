/* global browser */

import React from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';

import { callApi } from '@/main';
import { signIn } from '@/features/options/optionsSlice';
import { TokenHelpText } from '@/components/options/token-help-text';

const SignInFormError = () => {
  return (
    <div className='text-danger mt-3' role='alert'>
      Unable to sign in. Check your credentials and internet connectivity,
      then try again.
    </div>
  );
}

export const SignInForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [showSignInFormError, setShowSignInFormError] = useState(false);
  const [token, setToken] = useState('');
  const dispatch = useDispatch();

  const handleSignInForm = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    try {
      await callApi(
        'GET',
        'https://api.screenlyapp.com/api/v4/assets/',
        null,
        token
      );

      await browser.storage.sync.set({ token: token });

      setShowSignInFormError(false);
      dispatch(signIn());
    } catch {
      setShowSignInFormError(true);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="SignInForm page" id="sign-in-page">
      <form className="sign-in">
        <div className="form-group mb-3">
          <input
            className="form-control shadow-none"
            id="token"
            type="password"
            placeholder="Your token"
            onChange={(event) => setToken(event.target.value)}
          />
        </div>

        <TokenHelpText />

        <button
          className="btn btn-primary w-100 mt-5"
          id="sign-in-submit"
          type="submit"
          onClick={handleSignInForm}
        >
          {
            isLoading
              ? (
                  <span
                    className="spinner spinner-border spinner-border-sm">
                  </span>
                )
              : <span className="label">Sign In</span>
          }
        </button>

        {
          showSignInFormError
            ? <SignInFormError />
            : null
        }
      </form>
    </div>
  );
};

