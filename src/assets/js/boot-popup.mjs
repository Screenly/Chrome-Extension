import ReactDOM from 'react-dom/client';
import React from 'react';
import { useEffect, useState } from 'react';
import {
  Provider,
  useDispatch,
  useSelector,
} from 'react-redux';

import 'bootstrap/scss/bootstrap.scss';
import '../scss/style.scss';
import '../scss/sweetalert-icons.scss';

import { PopupSignIn } from './components/popup/sign-in.jsx';
import { PopupLoading } from './components/popup/loading.jsx';
import { Success } from './components/popup/success.jsx';
import { Proposal } from './components/popup/proposal.jsx';

import { store } from './store.js';

import {
  setLoading,
  setShowSignIn,
  setShowProposal,
  setShowSuccess,
} from './features/popup/popupSlice.js';

const Popup = () => {
  const dispatch = useDispatch();
  const showSignIn = useSelector((state) => state.popup.showSignIn);
  const isLoading = useSelector((state) => state.popup.loading);
  const showProposal = useSelector((state) => state.popup.showProposal);
  const showSuccess = useSelector((state) => state.popup.showSuccess);

  useEffect(() => {
    browser.storage.sync.get('token').then((result) => {
      if (result.token) {
        dispatch(setShowSignIn(false));
        dispatch(setShowProposal(true));
      }
    });
  }, []);

  return (
    <>
      {showSignIn && <PopupSignIn />}
      {isLoading && <PopupLoading />}
      {showProposal && <Proposal />}
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
