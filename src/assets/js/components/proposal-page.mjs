import {html, LitElement} from 'lit-element';

import {getPopupStyle} from '../helpers.mjs';
import {
  getUser,
  getWebAsset,
  State,
} from '../main.mjs';

class SaveAuthenticationWarning extends LitElement {
  constructor() {
    super();
    this.hostname = '';
  }

  static get styles() {
    return [getPopupStyle()];
  }

  static properties = {
    hostname: {type: String},
  };

  render() {
    return html`
      <div class='mt-2' id='with-auth-check-info'>
        <div class='alert alert-warning'>
          <p class='mb-0'>
            Warning: a determined attacker with physical access to your digital sign could extract these saved credentials for
            <span
              class='break-anywhere text-monospace'
              id='hostname'
            >
              ${this.hostname}
            </span>
            and gain access to your account.
          </p>
        </div>
      </div>
    `;
  }
}
customElements.define('save-authentication-warning', SaveAuthenticationWarning);

export class ProposalPage extends LitElement {
  constructor() {
    super();
    this.withAuthentication = false;
    this.currentProposal = null;
    this.assetTitle = '';
    this.assetUrl = '';
    this.assetHostname = '';
    this.buttonMode = 'add';
    this.error = {
      show: false,
      message: ''
    };

    this.prepareToAddToScreenly();
  }

  static properties = {
    withAuthentication: {type: Boolean},
    assetTitle: {type: String},
    assetHostname: {type: String},
    buttonMode: {type: String},
    error: {type: Object},
  }

  updateProposal(newProposal) {
    this.error.show = false;
    this.currentProposal = newProposal;
    const url = this.currentProposal.url;

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
        this.currentProposal.state = state;

        this.assetTitle = this.currentProposal.title;
        this.assetUrl = this.currentProposal.url;
        this.assetHostname = new URL(url).hostname;

        if (state) {
          console.info(`URL ${url} associated with asset ID ${state.assetId}`);

          this.withAuthentication = state.withCookies;
          this.buttonMode = 'update';
        } else {
          this.buttonMode = 'add';
        }
      })
      .catch((error) => {
        // Unknown error.
        this.error = {
          show: true,
          message: 'Failed to check asset.'
        }
        throw error;
      });
  }

  async proposeToAddToScreenly(user, url, title, cookieJar) {
    await this.updateProposal({
      user,
      title,
      url: State.normalizeUrl(url),
      cookieJar
    });
  }

  async prepareToAddToScreenly() {
    const onlyPrimaryDomain = true;
    const user = await getUser();

    if (!user.token) {
      showPage(elements.signInPage);
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

      await this.proposeToAddToScreenly(user, pageUrl, pageTitle, cookieJar);
    } catch (error) {
      console.error("Failed to list resources (%s).", error.message);
      window.close();
    }
  }

  static get styles() {
    return [getPopupStyle()];
  }

  handleAuthenticationCheckBox(event) {
    this.withAuthentication = event.target.checked;
  }

  render() {
    return html`
      <div class='page' id='proposal-page'>
        <form id='add-it'>
          <section>
            <h5 id='title'>${this.assetTitle}</h5>
          </section>
          <section class='bg-light'>
            <div
              class='break-anywhere text-monospace'
              id='url'
            >
              ${this.assetUrl}
            </div>
          </section>
          <section>
            <div class='form-check'>
              <input
                class='form-check-input'
                id='with-auth-check'
                type='checkbox'
                .checked=${this.withAuthentication}
                @change=${this.handleAuthenticationCheckBox}
              >
              <label
                class='form-check-label'
                for='with-auth-check'
              >
              Save Authentication
              </label>
            </div>

            <save-authentication-warning
              ?hidden=${!this.withAuthentication}
              hostname=${this.assetHostname}
            >
            </save-authentication-warning>

            <div class='font-italic mb-0 mt-2 text-muted'>
              <p class='mb-0'>
                This option saves the web page and <strong>your current session
                credentials</strong> to your Screenly account. Note that this
                option is not compatible with all web pages.
              </p>
            </div>
          </section>
          <section id='verification' hidden>
            <div class='form-check'>
              <input
                class='form-check-input'
                id='no-verification-check'
                type='checkbox'
              >
              <label class='form-check-label' for='no-verification-check'>Bypass Verification</label>
            </div>
          </section>
          <section>
            <button class='btn btn-primary w-100' id='add-it-submit' type='submit'>
              <span class='spinner spinner-border spinner-border-sm' ariaHidden='true' hidden='true'></span>
              <span
                class='add label'
                ?hidden=${this.buttonMode !== 'add'}
              >
                Add to Screenly
              </span>

              <span
                class='label update'
                ?hidden=${this.buttonMode !== 'update'}
              >
                Update Asset
              </span>
            </button>
            <div
              class='alert alert-danger mb-0 mt-3'
              id='add-it-error'
              ?hidden=${!this.error.show}
            >
              ${this.error.message}
            </div>
          </section>
        </form>
      </div>
    `;
  }
}
customElements.define('proposal-page', ProposalPage);
