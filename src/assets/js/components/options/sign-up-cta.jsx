import React from 'react';

export const SignUpCallToAction = () => {
  const getSignUpLink = () => {
    const baseUrl = 'https://login.screenlyapp.com/sign-up';
    const queryParams = `next=${window.location.href}`;
    return `${baseUrl}?${queryParams}`;
  };

  return (
    <div
      className="mt-4"
    >
      <section className="mt-2">
        <div className="text-center">
          Don&apos;t have an account?
          &nbsp;
          <a
            id="sign-up-link"
            href={getSignUpLink()}
            target="_blank"
            rel="noreferrer"
          >
            <strong>Sign Up</strong>
          </a>
        </div>
      </section>
    </div>
  );
};
