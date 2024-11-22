import {html, LitElement} from 'lit-element';

import {getPopupStyle} from '../helpers.mjs';

export class ProposalPage extends LitElement {
  constructor() {
    super();
  }

  static get styles() {
    return [getPopupStyle()];
  }

  render() {
    return html`
      <div class='page' id='proposal-page>
        <form id='add-it'>
          <section>
            <h5 id='title'></h5>
          </section>
          <section class='bg-light'>
            <div class='break-anywhere text-monospace' id='url'></div>
          </section>
          <section>
            <div class='form-check'>
              <input class='form-check-input' id='with-auth-check' type='checkbox'>
              <label class='form-check-label' for='with-auth-check'>Save Authentication</label>
            </div>
            <div class='mt-2' id='with-auth-check-info'>
              <div class='alert alert-warning'>
                <p class='mb-0'>
                  Warning: a determined attacker with physical access to your digital sign could extract these saved credentials for
                  <span class='break-anywhere text-monospace' id='hostname'>
                    example.com
                  </span>
                  and gain access to your account.
                </p>
              </div>
            </div>
            <div class='font-italic mb-0 mt-2 text-muted'>
              <p class='mb-0'>
                This option saves the web page and <strong>your current session credentials</strong> to your Screenly account. Note that this option is not compatible with all web pages.
              </p>
            </div>
          </section>
          <section id='verification' hidden>
            <div class='form-check'>
              <input class='form-check-input' id='no-verification-check' type='checkbox'>
              <label class='form-check-label' for='no-verification-check'>Bypass Verification</label>
            </div>
          </section>
          <section>
            <button class='btn btn-primary w-100' id='add-it-submit' type='submit'>
              <span class='spinner spinner-border spinner-border-sm' ariaHidden='true' hidden='true'></span>
              <span class='add label'>Add to Screenly</span>
              <span class='label update' hidden='true'>Update Asset</span>
            </button>
            <div class='alert alert-danger mb-0 mt-3' id='add-it-error' hidden='true'>
              Failed to save web page.
            </div>
          </section>
        </form>
      </div>
    `;
  }
}
customElements.define('proposal-page', ProposalPage);
