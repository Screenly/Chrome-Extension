import React from 'react';

export const SignedIn = () => {
  return (
    <div>
      <div className='page' id='signed-in-page'>
        <section>
          Signed in
        </section>
        <section className='mt-3'>
          <button
            className='btn btn-primary w-100'
            id='sign-out'
            type='submit'
          >
            <span
              className='spinner spinner-border spinner-border-sm'
              hidden={true}
            ></span>
            <span className='label'>Sign Out</span>
          </button>
        </section>
      </div>
    </div>
  );
};

