import {css} from 'lit';

// It's important to include this as a style for every
// component that will be created, otherwise custom and
// Bootstrap styles will not be applied.
export function getGlobalStyle() {
  if (!document.styleSheets.length) {
    return css``;
  }

  const { cssRules } = document.styleSheets[0];
  const globalStyle = css(
    [
      Object.values(cssRules)
        .map(rule => rule.cssText).join('\n')
    ]
  );

  return [
    globalStyle,
    // The elements with the `spinner-border` class doesn't show up,
    // so we need to include the following styles.
    css`
      @keyframes spinner-border {
        to {
          transform: rotate(360deg);
        }
      }

      .spinner-border {
        display: inline-block;
        width: 2rem;
        height: 2rem;
        vertical-align: text-bottom;
        border: .25em solid currentColor;
        border-right-color: transparent;
        border-radius: 50%;
        -webkit-animation: spinner-border .75s linear infinite;
        animation: spinner-border 1s linear infinite;
      }

      .spinner-border-sm {
        width: 1rem;
        height: 1rem;
        border-width: 0.2em;
      }
    `
  ];
}

export function getPopupStyle() {
  return [
    getGlobalStyle(),
    css`
      :host {
        .page {
          width: 350px;
          min-height: 300px;
          display: grid;
        }

        section {
          padding: 20px;
          border-bottom: 1px solid rgba(0, 0, 0, 0.1);
          font-size: 0.8rem;
          width: 100%;
          input {
            font-size: 1rem;
          }
        }

        label {
          font-size: 1rem;
        }

        h5 {
          margin-bottom: 0;
        }
      }
    `
  ];
}
