import React from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import classNames from 'classnames';

import { signOut } from '@/features/popupSlice';

export const Settings = () => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);

  const handleSignOut = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    dispatch(signOut());
    setIsLoading(false);
  };

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
          </div>
        </section>
        <section>
          <button
            className="btn btn-primary w-100"
            onClick={handleSignOut}
          >
            {
              isLoading
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
