import {html, LitElement} from 'lit-element';

import '../scss/style.scss';
import '../scss/sweetalert-icons.scss';
import "../../lib/vendor/normalize-url.js";
import {getPopupStyle} from './helpers.mjs';
import './components/popup-signin.mjs';
import './components/working-page.mjs';
import './components/proposal-page.mjs';
import './components/success-page.mjs';

export class PopupPage extends LitElement {
  constructor() {
    super();
    this.isLoading = false;
    this.showSignIn = false;
    this.showProposal = false;
    this.showSuccess = false;
  }

  async connectedCallback() {
    super.connectedCallback();

    this.isLoading = true;

    try {
      const {token} = await browser.storage.sync.get(['token']);
      if (token) {
        this.showProposal = true;
      } else {
        this.showSignIn = true;
      }
    } catch {
      this.showSignIn = true;
    }

    this.isLoading = false;
  }

  static get styles() {
    return [getPopupStyle()];
  }

  static properties = {
    isLoading: {type: Boolean},
    showSignIn: {type: Boolean},
    showProposal: {type: Boolean},
    showSuccess: {type: Boolean},
  };

  render() {
    return html`
      <popup-sign-in ?hidden=${!this.showSignIn}>
      </popup-sign-in>

      <working-page ?hidden=${!this.isLoading}>
      </working-page>

      <proposal-page hidden ?hidden=${!this.showProposal}>
      </proposal-page>

      <success-page hidden ?hidden=${!this.showSuccess}>
      </success-page>
    `;
  }
}
customElements.define('popup-root', PopupPage);
