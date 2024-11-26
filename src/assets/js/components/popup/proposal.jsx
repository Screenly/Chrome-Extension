import React from 'react';
import { useEffect, useState } from 'react';

import { SaveAuthWarning } from './save-auth-warning.jsx';
import { SaveAuthHelp } from './save-auth-help.jsx';

import * as cookiejs from '../../../../lib/vendor/cookie.mjs';
import {
  getUser,
  getWebAsset,
  createWebAsset,
  updateWebAsset,
  getAssetDashboardLink,
  State,
} from '../../main.mjs';

export const Proposal = (props) => {
  const [assetTitle, setAssetTitle] = useState('');
  const [assetUrl, setAssetUrl] = useState('');
  const [assetHostname, setAssetHostname] = useState('');
  const [buttonState, setButtonState] = useState('add');
  const [error, setError] = useState({
    show: false,
    message: 'Failed'
  });
  const [bypassVerification, setBypassVerification] = useState(false);
  const [saveAuthentication, setSaveAuthentication] = useState(false);

  let currentProposal = null;

  const updateProposal = (newProposal) => {
    setError((prev) => {
      return {
        ...prev,
        show: false
      };
    });

    currentProposal = newProposal;
    const url = currentProposal.url;

    return State.getSavedAssetState(url)
      .then((state) => {
        if (state)
          // Does the asset still exist?
          return getWebAsset(state.assetId, newProposal.user)
            .then(() => {
              // Yes it does. Proceed with the update path.
              return state;
            })
            .catch((error) => {
              if (error.status === 404) {
                // It's gone. Proceed like if we never had it.
                State.setSavedAssetState(url, null);
                return undefined;
              }

              throw error;
            });
      })
      .then((state) => {
        currentProposal.state = state;

        setAssetTitle(currentProposal.title);
        setAssetUrl(currentProposal.url);
        setAssetHostname(new URL(url).hostname);

        if (state) {
          console.info(`URL ${url} associated with asset ID ${state.assetId}`);

          withAuthentication = state.withCookies;
          setButtonState('update');
        } else {
          setButtonState('add');
        }
      })
      .catch((error) => {
        // Unknown error.
        setError((prev) => {
          return {
            ...prev,
            show: true,
            message: 'Failed to check asset.'
          };
        });
        throw error;
      });
  }

  const proposeToAddToScreenly = async(user, url, title, cookieJar) => {
    await updateProposal({
      user,
      title,
      url: State.normalizeUrl(url),
      cookieJar
    });
  };

  const prepareToAddToScreenly = async() => {
    const onlyPrimaryDomain = true;
    const user = await getUser();

    if (!user.token) {
      return;
    }

    let tabs = await browser.tabs.query({ active: true, currentWindow: true });
    let tabId = tabs[0].id;

    try {
      let result = await browser.scripting.executeScript({
        target: { tabId: tabId },
        func: () => {
          return [
            window.location.href,
            document.title,
            performance.getEntriesByType("resource").map(e => e.name)
          ];
        }
      });

      let [pageUrl, pageTitle, resourceEntries] = result[0].result;

      if (!resourceEntries) {
        console.info("Current page has no resources.");
        return;
      }

      const originDomain = new URL(pageUrl).host;

      let results = await Promise.all(
        resourceEntries.map(url =>
          browser.cookies.getAll({ url })
        )
      );

      let cookieJar = Array.from(
        new Map(
          results
            .flat(1)
            .map(cookie =>
              [
                JSON.stringify([cookie.domain, cookie.name]),
                cookie
              ]
            )
        ).values()
      );

      if (onlyPrimaryDomain) {
        // noinspection JSUnresolvedVariable
        cookieJar = cookieJar.filter(cookie =>
          cookie.domain === originDomain || (!cookie.hostOnly && originDomain.endsWith(cookie.domain))
        )
      }

      await proposeToAddToScreenly(user, pageUrl, pageTitle, cookieJar);
    } catch (error) {
      console.error("Failed to list resources (%s).", error.message);
      window.close();
    }
  };

  useEffect(() => {
    prepareToAddToScreenly();
  }, []);

  const getButtonContent = () => {
    switch (buttonState) {
      case 'add':
        return (
          <span className='add label'>
            Add to Screenly
          </span>
        );
      case 'loading':
        return (
          <span className='spinner-border spinner-border-sm'>
          </span>
        );
      case 'update':
        return (
          <span className='label update'>
            Update Asset
          </span>
        );
    }
  };

  return (
    <>
      <div className='page' id='proposal-page'>
        <form id='add-it'>
          <section>
            <h5 id='title'>{assetTitle}</h5>
          </section>
          <section className='bg-light'>
            <div
              className='break-anywhere text-monospace'
              id='url'
            >
              {assetUrl}
            </div>
          </section>
          <section>
            <div className='form-check'>
              <input
                className='form-check-input'
                id='with-auth-check'
                type='checkbox'
                checked={saveAuthentication}
                onChange={(e) => setSaveAuthentication(e.target.checked)}
              />
              <label
                className='form-check-label'
                for='with-auth-check'
              >
              Save Authentication
              </label>
            </div>
            <SaveAuthWarning hostname={assetHostname} hidden={!saveAuthentication} />
            <SaveAuthHelp />
          </section>

          <section id='verification' hidden={!bypassVerification}>
            <div className='form-check'>
              <input
                className='form-check-input'
                id='no-verification-check'
                type='checkbox'
              />
              <label
                className='form-check-label'
                for='no-verification-check'
              >
                Bypass Verification
              </label>
            </div>
          </section>

          <section>
            <button
              className='btn btn-primary w-100'
              id='add-it-submit'
              type='submit'
            >
              {getButtonContent()}
            </button>
            <div
              className='alert alert-danger mb-0 mt-3'
              id='add-it-error'
              hidden={!error.show}
            >
              {error.message}
            </div>
          </section>
        </form>
      </div>
    </>
  );
};
