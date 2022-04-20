import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
  :root {
    --color-logo: #4ad66d;
    --color-like: #2dc653;
    --color-accent-light: #208b3a;
    --color-accent: #155d27;
    --color-accent-dark: #10451d;
    --color-dark-grey: #0d0d0d;
    --color-grey: #878787;
    --color-light-grey: #d4d4d4;
    --color-lighter-grey: #f0f0f0;
    --navbar-height: 56px;
    --footer-height: 150px;
    --font-logo: 'Poppins', "Segoe UI", Helvetica, sans-serif;
    --font-heading: "Segoe UI", Helvetica, sans-serif; 
    --font-body: "Segoe UI", Helvetica, sans-serif;

    --font-lg: 25px;
    --font-md: 20px;
    --font-sm: 15px;
    --logo-color: #ffffff;
    --padding-lg: 28px;
    --padding-md: 16px;
    --padding-sm: 8px;
    --primary-button-color: #0d0d0d;
    --primary-button-active: rgba(255,255,255,0.7);
    --primary-button-background: #ffffff;
  }

  html, body, div, span, applet, object, iframe,
  h1, h2, h3, h4, h5, h6, p, blockquote, pre,
  a, abbr, acronym, address, big, cite, code,
  del, dfn, em, img, ins, kbd, q, s, samp,
  small, strike, strong, sub, sup, tt, var,
  b, u, i, center,
  dl, dt, dd, ol, ul, li,
  fieldset, form, label, legend,
  caption, tbody, tfoot, thead, tr, th, td,
  article, aside, canvas, details, embed,
  figure, figcaption, footer, header, hgroup,
  menu, nav, output, ruby, section, summary,
  time, mark, audio, video {
    margin: 0;
    padding: 0;
    border: 0;
    box-sizing: border-box;
    vertical-align: baseline;
  }
  /* HTML5 display-role reset for older browsers */
  article, aside, details, figcaption, figure,
  footer, header, hgroup, menu, nav, section {
    display: block;
  }
  body {
    line-height: 1;
    background-color: whitesmoke;
  }
  ol, ul {
    list-style: none;
  }
  blockquote, q {
    quotes: none;
  }
  blockquote:before, blockquote:after,
  q:before, q:after {
    content: '';
    content: none;
  }

  h1,
  h2,
  h3,
  label {
    color: var(--color-dark-grey);
    font-family: var(--font-heading);
    text-align: center;
  }
  p,
  a,
  li,
  div,
  span,
  blockquote,
  input,
  textarea {
    font-family: var(--font-body);
  }

  input {
    font-size: var(--font-md);
    height: 42px;
    border: none;
    border-radius: 4px;
    padding: 0 12px;
  }
  /* Button styles */
  button {
    display: block;
    padding: 0;
    margin: 0;
    border: none;
    color: #000000;
    background-color: transparent;
    font-family: var(--font-heading);
    font-size: var(--font-sm);
    text-align: center;
    cursor: pointer;
  }
`;