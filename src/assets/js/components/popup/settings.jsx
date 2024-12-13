import React from 'react';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import classNames from 'classnames';

import { signOut } from '@/features/popup/popupSlice';
import { getCompany, getUser } from '@/main'
import { PopupSpinner } from '@/components/popup/popup-spinner';

export const Settings = () => {
  const dispatch = useDispatch();
  const [isButtonLoading, setIsButtonLoading] = useState(false);
  const [companyName, setCompanyName] = useState('');
  const [isViewLoading, setIsViewLoading] = useState(false);

  const getCompanyData = async () => {
    setIsViewLoading(true);
    const user = await getUser();
    const company = await getCompany(user);
    setCompanyName(company);
    setIsViewLoading(false);
  };

  useEffect(() => {
    getCompanyData();
  }, [companyName]);

  const handleSignOut = async (event) => {
    event.preventDefault();
    setIsButtonLoading(true);
    dispatch(signOut());
    setIsButtonLoading(false);
  };

  if (isViewLoading) {
    return <PopupSpinner />;
  }

  return (
    <div className="page mt-3" id="success-page">
      <div className="d-flex flex-column">
        <section
          className={classNames(
            'align-items-center',
            'd-flex',
            'flex-grow-1',
            'justify-content-center',
            'border-bottom-0',
          )}
        >
          <div>
            <h3 className="text-center">
              You are already
              <br />
              signed in
            </h3>

            {
              companyName && (
                <p className="text-muted">
                  You are signed in as a member of {companyName}.
                </p>
              )
            }
          </div>
        </section>
        <section>
          <button
            className="btn btn-primary w-100"
            onClick={handleSignOut}
          >
            {
              isButtonLoading
                ? (
                  <span
                    className="spinner spinner-border spinner-border-sm"
                  ></span>
                )
                : (
                  <span className="label">Sign Out</span>
                )
            }
          </button>
        </section>
      </div>
    </div>
  );
};
