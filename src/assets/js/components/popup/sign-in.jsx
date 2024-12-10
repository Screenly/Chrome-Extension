/* global browser */

import React from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';

import { callApi } from '@/main';
import {
  notifySignInSuccess,
} from '@/features/popup/popupSlice';
import { TokenHelpText } from '@/components/popup/token-help-text';

const SignInFormError = ({ message }) => {
  return (
    <div className='text-danger mt-3' role='alert'>
      Unable to sign in. Check your credentials and internet connectivity,
      then try again.

      {message}
    </div>
  );
};

export const SignInForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [showSignInFormError, setShowSignInFormError] = useState(false);
  const [token, setToken] = useState('');
  const dispatch = useDispatch();

  const handleSignIn = async (event) => {
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
      dispatch(notifySignInSuccess());
    } catch {
      setShowSignInFormError(true);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="page mt-4" id="sign-in-page">
      <div className="d-flex flex-column">
        <section className="align-items-center d-flex flex-grow-1 justify-content-center border-0">
          <div className="text-center">
            <img src="assets/images/screenly-logo-128.png" width="64" />
            <h1 className="mb-1 mt-2">Screenly</h1>
            <a href="https://screenly.io">
              screenly.io
            </a>
          </div>
        </section>
        <section className="border-0">
          <form>
            <div className="form-group mb-3">
              <input
                className="form-control shadow-none"
                onChange={(event) => setToken(event.target.value)}
                type="password"
              />
            </div>

            <TokenHelpText />

            <button
              className="btn btn-primary w-100 mt-4"
              id="open-sign-in"
              onClick={handleSignIn}
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
              showSignInFormError &&
                <SignInFormError/>
            }
          </form>
        </section>
      </div>
    </div>
  );
};
