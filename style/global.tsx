import { globalCss } from 'mayumi/theme'

export const cheatSheetGlobalStyles = globalCss({
  /* hide scroll bar */
  '::-webkit-scrollbar': {
    width: '$0' /* Remove scrollbar space */,
    background: 'transparent' /* Optional: just make scrollbar invisible */,
  },
  '::-webkit-scrollbar-thumb': {
    background: 'transparent',
  },
  '#__next': {
    w: '$full',
    h: '$full',
    position: 'relative',
  },
  '#SHEET-CONTAINER': {
    zIndex: -1,
    flexBox: 'center',
    p: '$12',
    position: 'fixed',
    w: '$1-2',
  },
  // overwrite one-dark
  '.markdown-body': {
    '&&': {
      backgroundColor: '$black',
    },
    '&& pre': {
      fontFamily: '$mono',
      backgroundColor: '$windowBackgroundColor',
      my: '$4',
      mx: '$0',
    },
  },
  // make sure medium zoon overlay on top of others
  '.medium-zoom-overlay, .medium-zoom-image': {
    zIndex: '$20',
  },
  '.omcs-sheet': {
    '.markdown-body': {
      text: '$base',
      w: '$full',
    },
    '.markdown-body p': {
      px: '$4',
      my: '$4',
      border: 'none',
      w: '$full',
    },
    '.markdown-body code': {
      fontFamily: '$mono',
      background: 'transparent',
      p: '$0',
      m: '$0',
      text: '$base',
    },
    '.markdown-body pre': {
      fontFamily: '$mono',
      cursor: 'copy',
      my: '$0',
      rounded: '$none',
    },
    '.markdown-body h1, .markdown-body h2, .markdown-body h3, .markdown-body h4, .markdown-body h5, .markdown-body h6':
      {
        m: '$0',
        px: '$4',
        py: '$2',
        fontWeight: 'normal',
        text: '$base',
        borderTop: '1px solid $quaternaryLabelColor',
        borderBottom: '1px solid $quaternaryLabelColor',
      },
    '.markdown-body ul, .markdown-body ol': {
      mt: '$4',
      text: '$base',
    },
    '.markdown-body ul': {
      listStyle: 'none',
      p: '$0',
      m: '$0',
      borderTop: '1px solid $quaternaryLabelColor',
    },
    '.markdown-body blockquote': {
      p: '$0',
      my: '$2',
      border: 'none',
    },
    '.markdown-body blockquote + blockquote': {
      pt: '$0',
    },
    '.markdown-body blockquote p': {
      mt: '$0',
    },
    '.markdown-body>*:first-child': {
      borderTop: 'none !important',
    },

    // list
    '.markdown-body ol': {
      p: '$4',
      my: '$0',
    },

    '.markdown-body ul li': {
      py: '$2',
      px: '$4',
      borderBottom: '1px solid $quaternaryLabelColor',
    },

    '.markdown-body ul li:first-child': {
      borderTop: 'none',
    },

    /* table child section */
    '.markdown-body table': {
      borderTop: '1px solid $quaternaryLabelColor',
      w: '$full',
      my: '$0',
      display: 'table',
    },

    '.markdown-body table tr, .markdown-body table td': {
      border: 'none',
    },
    '.markdown-body table tr': {
      borderBottom: '1px solid $quaternaryLabelColor',
    },
    '.markdown-body table td': {
      p: '$2',
    },
    '.markdown-body table td:last-child': {
      textAlign: 'right',
    },
    '.markdown-body table thead': {
      display: 'none',
    },
    '@laptop': {
      '.markdown-body ul li code:last-child': {
        float: 'left',
      },
    },
  },
})
