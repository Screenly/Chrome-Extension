/* global browser */

import {html, LitElement} from 'lit';
import {getGlobalStyle} from '../helpers.mjs';
import {callApi} from '../main.mjs';

class SignInError extends LitElement {
  constructor() {
    super();
  }

  static get styles() {
    return [getGlobalStyle()]
  }

  render() {
    return html`
      <div
        class='alert alert-danger mb-0 mt-3'
        id='sign-in-error'
      >
        Unable to sign in. Check your credentials and internet connectivity, then try again.
      </div>
    `;
  }
}

customElements.define('sign-in-error', SignInError);

export class SignIn extends LitElement {
  constructor() {
    super();
    this.token = '';
    this.showSignInError = false;
  }

  static properties = {
    token: {type: String},
    showSignInError: {type: Boolean},
  };

  static get styles() {
    return [getGlobalStyle()]
  }

  setToken(event) {
    this.token = event.target.value;
  }

  async signIn(event) {
    event.preventDefault();

    try {
      await callApi(
        'GET',
        'https://api.screenlyapp.com/api/v4/assets/',
        null,
        this.token
      );

      await browser.storage.sync.set({token: this.token});
      this.showSignInError = false;
    } catch {
      this.showSignInError = true;
      return;
    }

    this.dispatchEvent(new CustomEvent('sign-in'));
  }

  render() {
    // TODO: Add sign up link in the anchor tag.
    return html`
      <div class='page' id='sign-in-page'>
        <form class='sign-in'>
          <div class='form-group mb-3'>
            <input
              class='form-control'
              id='token'
              type='password'
              placeholder='Token'
              required='true'
              @change=${this.setToken}
            >
          </div>
          <button
            class='btn btn-primary w-100'
            id='sign-in-submit'
            type='submit'
            @click=${this.signIn}
          >
            <span class='spinner spinner-border spinner-border-sm' ariaHidden='true' hidden='true'></span>
            <span class='label'>Sign In</span>
          </button>
          <sign-in-error ?hidden=${!this.showSignInError}>
          </sign-in-error>
        </form>
        <section class='mt-2'>
          <div class='small text-center'>
            Need an account?
            <a id='sign-up-link'>
              Sign Up.
            </a>
          </div>
        </section>
      </div>
    `;
  }
}

customElements.define('sign-in', SignIn);
