import {html, LitElement} from 'lit-element';
import {getPopupStyle} from '../helpers.mjs';

export class SaveAuthenticationWarning extends LitElement {
  constructor() {
    super();
    this.hostname = '';
  }

  static get styles() {
    return [getPopupStyle()];
  }

  static properties = {
    hostname: {type: String},
  };

  render() {
    return html`
      <div class='mt-2' id='with-auth-check-info'>
        <div class='alert alert-warning'>
          <p class='mb-0'>
            Warning: a determined attacker with physical access to your digital sign could extract these saved credentials for
            <span
              class='break-anywhere text-monospace'
              id='hostname'
            >
              ${this.hostname}
            </span>
            and gain access to your account.
          </p>
        </div>
      </div>
    `;
  }
}
customElements.define('save-authentication-warning', SaveAuthenticationWarning);

export class SaveAuthenticationHelp extends LitElement {
  static get styles() {
    return [getPopupStyle()];
  }

  render() {
    return html`
      <div class='font-italic mb-0 mt-2 text-muted'>
        <p class='mb-0'>
          This option saves the web page and <strong>your current session
          credentials</strong> to your Screenly account. Note that this
          option is not compatible with all web pages.
        </p>
      </div>
    `;
  }
}
customElements.define('save-authentication-help', SaveAuthenticationHelp);
