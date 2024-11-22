import {html, LitElement} from 'lit-element';

import {getPopupStyle} from '../helpers.mjs';

export class PopupSignIn extends LitElement {
  constructor() {
    super();
  }

  static get styles() {
    return [getPopupStyle()];
  }

  handleSignIn() {
    browser.runtime.openOptionsPage();
  }

  render() {
    return html`
      <div class='page' id='sign-in-page'>
        <div class='d-flex flex-column'>
          <section class='align-items-center d-flex flex-grow-1 justify-content-center'>
            <div class='text-center'>
              <img src='assets/images/screenly-logo-128.png' width='64'>
              <h1 class='mb-1 mt-2'>Screenly</h1>
              <a href='https://screenly.io'>
                screenly.io
              </a>
            </div>
          </section>
          <section>
            <button
              class='btn btn-primary w-100'
              id='open-sign-in'
              @click=${this.handleSignIn}
            >
              Sign In
            </button>
          </section>
        </div>
      </div>
    `;
  }
}
customElements.define('popup-sign-in', PopupSignIn);
