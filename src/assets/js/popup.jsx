import ReactDOM from 'react-dom/client';
import {
  useEffect,
  useState,
} from 'react';
import {
  Provider,
  useDispatch,
  useSelector,
} from 'react-redux';
import 'bootstrap-icons/font/bootstrap-icons.scss';

import '@/scss/style.scss';
import '@/scss/sweetalert-icons.scss';

import { SignInForm } from '@/components/popup/sign-in';
import { Success } from '@/components/popup/success';
import { Proposal } from '@/components/popup/proposal';
import { SignInSuccess } from '@/components/popup/sign-in-success';
import { Settings } from '@/components/popup/settings';

import { store } from '@/store';
import { signIn } from '@/features/popup/popupSlice';

const PopupPage = () => {
  const dispatch = useDispatch();

  const {
    showSignIn,
    showProposal,
    showSuccess,
    showSignInSuccess,
    showSettings,
  } = useSelector((state) => state.popup);

  const [assetDashboardLink, setAssetDashboardLink] = useState('');

  useEffect(() => {
    dispatch(signIn());

    document.addEventListener('set-asset-dashboard-link', (event) => {
      setAssetDashboardLink(event.detail);
    });
  }, []);

  return (
    <>
      {showSignIn && <SignInForm />}
      {showProposal && <Proposal />}
      {showSuccess && <Success assetDashboardLink={assetDashboardLink} />}
      {showSignInSuccess && <SignInSuccess />}
      {
        showSettings && <Settings />
      }
    </>
  );
}

const root = ReactDOM.createRoot(document.getElementById('app'));
root.render(
  <Provider store={store}>
    <PopupPage />
  </Provider>
);
