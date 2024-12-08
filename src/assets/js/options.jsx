/* global browser */

import ReactDOM from 'react-dom/client';
import React from 'react';
import { useEffect } from 'react';
import {
  Provider,
  useSelector,
  useDispatch,
} from 'react-redux';
import classNames from 'classnames';

import '@/scss/style.scss';

import { SignInForm } from '@/components/options/sign-in';
import {
  AuthenticatedOptionsView
} from '@/components/options/authenticated-options';

import { store } from '@/store';
import { signIn } from '@/features/options/optionsSlice';

const OptionsPage = () => {
  const signedIn = useSelector((state) => state.auth.signedIn);
  const dispatch = useDispatch();

  const getSignUpLink = () => {
    const baseUrl = 'https://login.screenlyapp.com/sign-up';
    const queryParams = `next=${window.location.href}`;
    return `${baseUrl}?${queryParams}`;
  };

  useEffect(() => {
    browser.storage.sync.get('token').then((result) => {
      if (result.token) {
        dispatch(signIn());
      }
    });
  }, []);

  return (
    <div className="container OptionsPage">
      <div>
        <div className="mb-5 mt-5 text-center">
          <img src='assets/images/screenly-logo-128.png' width="128" />
        </div>
        <div
          className={classNames(
            'container',
            'container-small',
            'p-5',
          )}
        >
          {
            signedIn
              ? <AuthenticatedOptionsView />
              : <SignInForm />
          }
        </div>
        <div
          className="mt-4"
        >
          <section className="mt-2">
            <div className="text-center">
              Don&apos;t have an account?
              &nbsp;
              <a
                id="sign-up-link"
                href={getSignUpLink()}
                target="_blank"
                rel="noreferrer"
              >
                <strong>Sign Up</strong>
              </a>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('app'));
root.render(
  <Provider store={store}>
    <OptionsPage />
  </Provider>
);
