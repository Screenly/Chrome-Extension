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

  return globalStyle;
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
