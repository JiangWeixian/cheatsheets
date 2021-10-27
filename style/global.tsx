import { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`
  body {
    @apply m-0 p-0 w-100vw h-100vh text-base;

    /* font-family: 'IBM Plex Mono', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
      Ubuntu, Cantarell, 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif; */
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
      Ubuntu, Cantarell, 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  /* hide scroll bar */
  ::-webkit-scrollbar {
    width: 0px; /* Remove scrollbar space */
    background: transparent; /* Optional: just make scrollbar invisible */
  }
  ::-webkit-scrollbar-thumb {
    background: transparent;
  }

  #__next {
    height: 100%;
    width: 100%;
    @apply relative;
  }

  a {
    color: inherit;
    @apply underline-transparent;
  }

  #SHEET-CONTAINER {
    z-index: -1;

    @apply flex justify-center items-center p-12 bg-gray-300 fixed w-1/2;
  }

  /** overwrite github.css */
  .markdown-body {
    background-color: var(--bg-color-1);
    color: var(--text-color-0);
    @apply text-base;
  }

  .markdown-body p {
    @apply px-4;
  }

  .markdown-body code {
    font-family: 'Fira Code', monospace;
    @apply bg-transparent text-green-600 p-0 text-base m-0;
  }

  .markdown-body pre {
    font-family: 'Fira Code', monospace;
    cursor: copy;
    @apply my-0;
    background-color: var(--bg-color);
  }

  .markdown-body h1,
  .markdown-body h2,
  .markdown-body h3,
  .markdown-body h4,
  .markdown-body h5,
  .markdown-body h6 {
    background-color: var(--bg-color-2);
    color: var(--text-color-2);

    @apply m-0 px-4 py-2 font-normal text-sm text-base;

    border-bottom: 1px solid var(--border-color);
    border-top: 1px solid var(--border-color);
  }

  .markdown-body ul,
  .markdown-body ol {
    @apply pl-8 mt-4 text-base;
  }

  .markdown-body ul {
    @apply list-none pl-0 my-0;
    background-color: var(--bg-color);
    border-top: 1px solid var(--border-color);
  }

  .markdown-body blockquote {
    @apply border-none p-0 mt-4;
    border-bottom: 1px solid var(--border-color);
    border-top: 1px solid var(--border-color);
    color: var(--text-color-2);
  }

  .markdown-body blockquote + blockquote {
    @apply pt-0;
  }

  .markdown-body blockquote p {
    @apply mt-4;
  }

  .markdown-body p {
    @apply border-none my-4;
  }
  
  .markdown-body>*:first-child {
    border-top: none !important;
  }

  @media screen and (min-width: 1024px) {
    .markdown-body ul li code:last-child {
      @apply float-right;
    }
  }

  .markdown-body ul li {
    @apply py-2 px-4;
    border-bottom: 1px solid var(--border-color);
  }

  .markdown-body ul li:last-child {
  }

  .markdown-body ul li:first-child {
    border-top: none;
  }

  /* table child section */
  .markdown-body table {
    border-top: 1px solid var(--border-color);
    @apply w-full my-0 table;
  }

  .markdown-body table tr,
  .markdown-body table td {
    @apply border-none;
  }
  .markdown-body table tr {
    background-color: var(--bg-color);
    border-bottom: 1px solid var(--border-color);
  }
  .markdown-body table td {
    @apply p-2;
  }
  .markdown-body table td:last-child {
    text-align: right;
  }
  .markdown-body table thead {
    display: none;
  }
`
