import {html, LitElement} from 'lit-element';

import {getPopupStyle} from '../helpers.mjs';

export class WorkingPage extends LitElement {
  constructor() {
    super();
  }

  static get styles() {
    return [getPopupStyle()];
  }

  render() {
    return html`
      <div class='page' id='working-page'>
        <div class='align-items-center d-flex h-100 justify-content-center'>
          <div class='spinner spinner-border'>
            <span class='sr-only'></span>
          </div>
        </div>
      </div>
    `;
  }
}
customElements.define('working-page', WorkingPage);
