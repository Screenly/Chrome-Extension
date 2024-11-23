/* global browser */

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
      if (!token) {
        this.showSignIn = true;
      }
    } catch {
      this.showSignIn = true;
    }

    if (this.showSignIn) {
      this.isLoading = false;
      return;
    }
  }

  static get styles() {
    return [getPopupStyle()];
  }

  static properties = {
    isLoading: {type: Boolean},
    showSignIn: {type: Boolean},
    showProposal: {type: Boolean},
    showSuccess: {type: Boolean},
    assetDashboardLink: {type: String},
  };

  showProposalPage() {
    this.showProposal = true;
    this.showSignIn = false;
    this.isLoading = false;
  }

  showSuccessPage(event) {
    this.showSuccess = true;
    this.showProposal = false;
    this.showSignIn = false
    this.isLoading = false;

    this.assetDashboardLink = event.detail.assetDashboardLink;
  }

  render() {
    return html`
      <popup-sign-in ?hidden=${!this.showSignIn}>
      </popup-sign-in>

      <working-page ?hidden=${!this.isLoading}>
      </working-page>

      <proposal-page
        ?hidden=${!this.showProposal}
        @proposal-success=${this.showSuccessPage}
        @proposal-ready=${this.showProposalPage}
      >
      </proposal-page>

      <success-page
        ?hidden=${!this.showSuccess}
        .assetDashboardLink=${this.assetDashboardLink}
      >
      </success-page>
    `;
  }
}
customElements.define('popup-root', PopupPage);
