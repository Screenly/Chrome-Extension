/* global browser */

import ReactDOM from 'react-dom/client';
import React from 'react';
import { useEffect } from 'react';
import {
  Provider,
  useSelector,
  useDispatch,
} from 'react-redux';

import 'bootstrap/scss/bootstrap.scss';
import '@/scss/style.scss';

import { SignIn } from '@/components/options/sign-in';
import { SignedIn } from '@/components/options/signed-in';

import { store } from '@/store';
import { signIn } from '@/features/auth/authSlice';

const Options = () => {
  const signedIn = useSelector((state) => state.auth.signedIn);
  const dispatch = useDispatch();

  useEffect(() => {
    browser.storage.sync.get('token').then((result) => {
      if (result.token) {
        dispatch(signIn());
      }
    });
  }, []);

  return (
    <div className="container">
      <div className='container container-small'>
        <div className='mb-5 mt-5 text-center'>
          <img src='assets/images/screenly-logo-128.png' width='64' />
        </div>

        {
          signedIn
            ? <SignedIn />
            : <SignIn />
        }
      </div>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById("app"));
root.render(
  <Provider store={store}>
    <Options />
  </Provider>
);
