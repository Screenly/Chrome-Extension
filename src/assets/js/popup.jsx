import ReactDOM from 'react-dom/client';
import React from 'react';
import {
  useEffect,
  useState,
} from 'react';
import {
  Provider,
  useDispatch,
  useSelector,
} from 'react-redux';

import '@/scss/style.scss';
import '@/scss/sweetalert-icons.scss';

import { SignInCallToAction } from '@/components/popup/sign-in';
import { Success } from '@/components/popup/success';
import { Proposal } from '@/components/popup/proposal';
import { SignInSuccess } from '@/components/popup/sign-in-success';

import { store } from '@/store';
import { signIn } from '@/features/popup/popupSlice';

const PopupPage = () => {
  const dispatch = useDispatch();

  const showSignIn = useSelector((state) => state.popup.showSignIn);
  const showProposal = useSelector((state) => state.popup.showProposal);
  const showSuccess = useSelector((state) => state.popup.showSuccess);

  const [assetDashboardLink, setAssetDashboardLink] = useState('');
  const showSignInSuccess = useSelector((state) => state.popup.showSignInSuccess);

  useEffect(() => {
    dispatch(signIn());

    document.addEventListener('set-asset-dashboard-link', (event) => {
      setAssetDashboardLink(event.detail);
    });
  }, []);

  return (
    <>
      {showSignIn && <SignInCallToAction />}
      {showProposal && <Proposal />}
      {showSuccess && <Success assetDashboardLink={assetDashboardLink} />}
      {showSignInSuccess && <SignInSuccess />}
    </>
  );
}

const root = ReactDOM.createRoot(document.getElementById('app'));
root.render(
  <Provider store={store}>
    <PopupPage />
  </Provider>
);
