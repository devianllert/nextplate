import styled from 'styled-components';

export const ButtonBaseRoot = styled.button`
  box-sizing: border-box;

  position: relative;

  display: inline-flex;
  align-items: center;
  justify-content: center;

  -webkit-tap-highlight-color: transparent;

  // Reset default value
  background-color: transparent;
  // So we take precedent over the style of a native <a /> element.
  color: inherit;

  // We disable the focus ring for mouse, touch and keyboard users.
  outline: 0;
  border: 0;
  border-radius: 0;

  // Remove the margin in Safari
  margin: 0;
  // Remove the padding in Firefox
  padding: 0;

  cursor: pointer;
  user-select: none;
  vertical-align: middle;
  appearance: none;
  text-decoration: none;

  &:-moz-focus-inner {
    border-style: none; // Remove Firefox dotted outline.
  }

  &[disabled] {
    pointer-events: none; // Disable link interactions
    cursor: default;
  }
`;
