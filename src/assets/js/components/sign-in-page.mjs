import {html, LitElement} from 'lit-element';

export class SignIn extends LitElement {
  constructor() {
    super();
  }

  createRenderRoot() {
    return this;
  }

  signIn(event) {
    event.preventDefault();
    this.dispatchEvent(new CustomEvent('sign-in'));
  }

  render() {
    return html`
      <div class='page' id='sign-in-page'>
        <form class='sign-in'>
          <div class='form-group mb-3'>
            <input class='form-control' id='token' type='password' placeholder='Token' required='true'>
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
          <div class='alert alert-danger mb-0 mt-3' id='sign-in-error' hidden='true'>
            Unable to sign in. Check your credentials and internet connectivity, then try again.
          </div>
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
