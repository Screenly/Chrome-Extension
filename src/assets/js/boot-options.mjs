'use strict';

// import {initOptions} from "./options.mjs"; // TODO: Uncomment.
import {html, LitElement} from 'lit';

// initOptions(); // TODO: Uncomment.

export class OptionsPage extends LitElement {
    constructor() {
        super();
    }

    render() {
        return html`
            <div class="container">
                <h1>Hello, World!</h1>
            </div>
        `;
    }
}
customElements.define('options-root', OptionsPage);
