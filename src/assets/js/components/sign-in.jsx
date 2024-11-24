import React from 'react';
import { useState } from 'react';

import { callApi } from '../main.mjs';
import {
  useDispatch,
} from 'react-redux';
import { signIn } from '../features/auth/authSlice.js';

const SignInError = () => {
  return (
    <div className='alert alert-danger mt-2' role='alert'>
      Sign In Error
    </div>
  );
}

export const SignIn = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [showSignInError, setShowSignInError] = useState(false);
  const [token, setToken] = useState('');
  const dispatch = useDispatch();

  const handleSignIn = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    try {
      console.log(`sign-in - token: ${token}`);

      await callApi(
        'GET',
        'https://api.screenlyapp.com/api/v4/assets/',
        null,
        token
      );

      console.log('sign-in - #1');

      await browser.storage.sync.set({ token: token });
      console.log('sign-in - #2');
      setShowSignInError(false);
    } catch (error) {
      setShowSignInError(true);
      return;
    } finally {
      setIsLoading(false);
    }

    setIsLoading(false);
    dispatch(signIn());
  }

  return (
    <>
      <div>
        <div className='page' id='sign-in-page'>
          <form className='sign-in'>
            <div className='form-group mb-3'>
              <input
                className='form-control'
                id='token'
                type='password'
                placeholder='Token'
                onChange={(event) => setToken(event.target.value)}
              />
            </div>
            <button
              className='btn btn-primary w-100'
              id='sign-in-submit'
              type='submit'
              onClick={handleSignIn}
            >
              {
                isLoading
                  ? (
                      <span
                        className='spinner spinner-border spinner-border-sm'>
                      </span>
                    )
                  : <span className='label'>Sign In</span>
              }
            </button>
            {
              showSignInError
                ? <SignInError />
                : null
            }
          </form>
          <section className='mt-2'>
            <div className='small text-center'>
              Need an account?
              &nbsp;
              <a
                id='sign-up-link'
                href='#'
              >
                Sign Up
              </a>
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

