import React from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';

import { signOut } from '@/features/popup/popupSlice';

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
    <div className="page" id="success-page">
      <div className="d-flex flex-column">
        <section
          className="align-items-center d-flex flex-grow-1 justify-content-center"
        >
          <div>
            <h3 className="text-center mb-3">
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
