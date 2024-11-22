import {html, LitElement} from 'lit-element';

import {getPopupStyle} from '../helpers.mjs';

export class SuccessPage extends LitElement {
  constructor() {
    super();
  }

  static get styles() {
    return [getPopupStyle()];
  }

  render() {
    return html`
      <div class='page' id='success-page'>
        <div class='d-flex flex-column'>
          <section class='align-items-center d-flex flex-grow-1 justify-content-center'>
            <div>
              <div class='mt-4 success-checkmark'>
                <div class='check-icon'>
                  <span class='icon-line line-tip'></span>
                  <span class='icon-line line-long'></span>
                  <div class='icon-circle'></div>
                  <div class='icon-fix'></div>
                </div>
              </div>
              <h3 class='text-center'>
                Web page saved!
              </h3>
              <p class='text-muted'>
                To show the web page on your digital sign, add the web asset to a playlist in your Screenly account.
              </p>
            </div>
          </section>
          <section>
            <button class='btn btn-primary w-100' id='view-it'>
              <span class='label'>View Asset</span>
            </button>
          </section>
        </div>
      </div>
    `;
  }
}
customElements.define('success-page', SuccessPage);
