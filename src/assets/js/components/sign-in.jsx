import React from 'react';
import { useState } from 'react';

import { callApi } from '../main.mjs';

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

  const signIn = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    try {
      await callApi(
        'GET',
        'https://api.screenlyapp.com/api/v4/assets/',
        null,
        this.token
      );

      await browser.storage.sync.set({token: this.token});
      setShowSignInError(false);
    } catch {
      setShowSignInError(true);
    }

    setIsLoading(false);

    if (showSignInError) {
      return;
    }
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
              />
            </div>
            <button
              className='btn btn-primary w-100'
              id='sign-in-submit'
              type='submit'
              onClick={signIn}
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

