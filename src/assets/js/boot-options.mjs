/* global browser */

import {html, LitElement} from 'lit-element';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap';

import '../scss/style.scss';
import './components/sign-in-page.mjs';
import './components/signed-in-page.mjs';
import {getGlobalStyle} from './helpers.mjs';

export class OptionsPage extends LitElement {
  constructor() {
    super();
    this.signedIn = false;
  }

  async connectedCallback() {
    super.connectedCallback();

    try {
      const {token} = await browser.storage.sync.get(['token']);
      if (token) {
        this.signedIn = true;
      }
    } catch {
      this.signedIn = false;
    }
  }

  static properties = {
    signedIn: {type: Boolean},
  };

  static get styles() {
    return [getGlobalStyle()];
  }

  signOut() {
    this.signedIn = false;
  }

  signIn() {
    this.signedIn = true;
  }

  render() {
    return html`
      <div class="container">
        <div class='container container-small'>
          <div class='mb-5 mt-5 text-center'>
            <img src='assets/images/screenly-logo-128.png' width='64'>
          </div>
          <sign-in
            ?hidden=${this.signedIn}
            @sign-in=${this.signIn}
          ></sign-in>
          <signed-in
            ?hidden=${!this.signedIn}
            @sign-out=${this.signOut}
          ></signed-in>
        </div>
      </div>
    `;
  }
}
customElements.define('options-root', OptionsPage);
