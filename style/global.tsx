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
  }

  a {
    color: inherit;
    @apply underline-transparent;
  }

  /* markdown & sheet */
  /* content */
  .theme-default {
    @apply text-gray-500 text-base;
  }

  .theme-default p,
  .theme-default td {
    @apply text-base;
  }
  /* link */
  .theme-default a {
    @apply text-indigo-600;
  }

  /* description */
  .theme-default p,
  .theme-default h3 {
    padding: 0.25rem 0 0.25rem 1rem;
    @apply m-0 p-4 text-base text-base;
  }
  .theme-default h3,
  .theme-default blockquote {
    @apply bg-gray-100 border-t-2 border-gray-200;
  }
  .theme-default blockquote > p {
    @apply m-0 bg-transparent;
  }
  /* ul child section */
  .theme-default ul {
    @apply border-b-2 border-gray-200 m-0 p-0 text-base;
  }
  .theme-default ul li {
    border-bottom-width: 1px;
    @apply border-gray-100 p-4;
  }
  .theme-default ul li > p {
    @apply p-0;
  }
  /* ul table like section */
  @media screen and (min-width: 1024px) {
    .theme-default ul li code:last-child {
      @apply float-right;
    }
  }
  .theme-default ul li code:last-child {
    @apply block;
  }
  
  /* table child section */
  table,
  tr,
  td {
    @apply border-0;
  }
  tr {
    @apply border-b-2 border-gray-100;
  }
  td {
    @apply p-4;
  }
  .theme-default table td:last-child {
    text-align: right;
  }
  .theme-default table {
    @apply border-0 w-full m-0 border-b-2 border-gray-200;
  }
  .theme-default table thead {
    display: none;
  }
  .theme-default table tbody {
    @apply w-full;
  }
  /* ol section */
  .theme-default ol,
  theme-default ul {
    @apply p-4 list-decimal list-inside text-base;
  }
  .theme-default ol li p {
    @apply inline-block;
  }
  /* code */
  .theme-default pre {
    @apply m-0 bg-white;
    cursor: copy;
  }
  .theme-default code {
    font-family: 'Fira Code', monospace;
    @apply bg-transparent text-green-600 p-0 text-base m-0;
  }
`
