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
        Unable to sign in. Check your credentials and internet connectivity,
        then try again.
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
    this.isLoading = false;
  }

  static properties = {
    token: {type: String},
    showSignInError: {type: Boolean},
    isLoading: {type: Boolean},
  };

  static get styles() {
    return [getGlobalStyle()]
  }

  setToken(event) {
    this.token = event.target.value;
  }

  async signIn(event) {
    event.preventDefault();

    this.isLoading = true;

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
    }

    this.isLoading = false;

    if (this.showSignInError) {
      return;
    }

    this.dispatchEvent(new CustomEvent('sign-in'));
  }

  getSignUpLink() {
    return `https://login.screenlyapp.com/sign-up?next=${window.location.href}`
  }


  render() {
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
            ${
              this.isLoading
                ? html`
                    <span
                      class='spinner spinner-border spinner-border-sm'>
                    </span>
                  `
                : html`<span class='label'>Sign In</span>`
            }
          </button>
          <sign-in-error ?hidden=${!this.showSignInError}>
          </sign-in-error>
        </form>
        <section class='mt-2'>
          <div class='small text-center'>
            Need an account?
            <a
              id='sign-up-link'
              href=${this.getSignUpLink()}
            >
              Sign Up.
            </a>
          </div>
        </section>
      </div>
    `;
  }
}

customElements.define('sign-in', SignIn);
