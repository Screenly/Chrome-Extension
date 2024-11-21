/* global browser */

import {html, LitElement} from 'lit-element';
import {getGlobalStyle} from '../helpers.mjs';

export class SignedIn extends LitElement {
  constructor() {
    super();
  }

  static get styles() {
    return [getGlobalStyle()]
  }

  async signOut(event) {
    event.preventDefault();

    try {
      await browser.storage.sync.clear();
    } catch {
      return;
    }

    this.dispatchEvent(new CustomEvent('sign-out'));
  }

  render() {
    return html`
      <div class='page' id='signed-in-page'>
        <section>
          Signed in
        </section>
        <section class='mt-3'>
          <button
            class='btn btn-primary w-100'
            id='sign-out'
            type='submit'
            @click=${this.signOut}
          >
            <span class='spinner spinner-border spinner-border-sm' ariaHidden='true' hidden='true'></span>
            <span class='label'>Sign Out</span>
          </button>
        </section>
      </div>
    `;
  }
}

customElements.define('signed-in', SignedIn);

