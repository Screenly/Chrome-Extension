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
  }

  static get styles() {
    return [getPopupStyle()];
  }

  render() {
    return html`
      <popup-sign-in></popup-sign-in>
      <working-page hidden></working-page>
      <proposal-page hidden></proposal-page>
      <success-page hidden></success-page>
    `;
  }
}
customElements.define('popup-root', PopupPage);
