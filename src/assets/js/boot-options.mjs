import ReactDOM from 'react-dom/client';
import React from 'react';
import { useState, useEffect } from 'react';

import 'bootstrap/scss/bootstrap.scss';
import '../scss/style.scss';

import { SignIn } from './components/sign-in.jsx';
import { SignedIn } from './components/signed-in.jsx';

const Options = () => {
  const [signedIn, setSignedIn] = useState(false);

  const getTokenFromStorage = async () => {
    try {
      const {token} = await browser.storage.sync.get(['token']);
      if (token) {
        setSignedIn(true);
      }
    } catch {
      setSignedIn(false);
    }
  };

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
root.render(<Options />);
