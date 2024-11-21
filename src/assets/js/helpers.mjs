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
