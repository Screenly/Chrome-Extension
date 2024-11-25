import ReactDOM from 'react-dom/client';
import React from 'react';
import { useEffect, useState } from 'react';
import { Provider } from 'react-redux';

import 'bootstrap/scss/bootstrap.scss';
import '../scss/style.scss';
import '../scss/sweetalert-icons.scss';

import { PopupSignIn } from './components/popup/sign-in.jsx';
import { PopupLoading } from './components/popup/loading.jsx';
import { Success } from './components/popup/success.jsx';

import { store } from './store.js';

const Popup = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [showSignIn, setShowSignIn] = useState(true);
  const [showProposal, setShowProposal] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    browser.storage.sync.get('token').then((result) => {
      if (result.token) {
        setShowSignIn(false);
        setIsLoading(true);
      }
    });
  }, []);

  return (
    <>
      {showSignIn && <PopupSignIn />}
      {isLoading && <PopupLoading />}
      {showProposal && <PopupLoading />}
      {showSuccess && <Success />}
    </>
  );
}

const root = ReactDOM.createRoot(document.getElementById("app"));
root.render(
  <Provider store={store}>
    <Popup />
  </Provider>
);
