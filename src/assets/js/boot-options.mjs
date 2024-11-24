import ReactDOM from 'react-dom/client';
import React from 'react';

import 'bootstrap/scss/bootstrap.scss';
import '../scss/style.scss';

import { SignIn } from './components/sign-in.jsx';
import { SignedIn } from './components/signed-in.jsx';

import { store } from './store.js';
import {
  Provider,
  useSelector,
} from 'react-redux';

const Options = () => {
  const signedIn = useSelector((state) => state.auth.signedIn);

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
