import {extendTheme} from '@chakra-ui/react'

const theme = extendTheme({
  fonts: {
    body: 'EB Garamond, sans-serif',
    heading: 'EB Garamond, sans-serif',
    mono: 'Menlo, monospace',
  },
  fontSizes: {
    xs: '12px',
    sm: '14px',
    md: '16px',
    lg: '18px',
    xl: '20px',
    '2xl': '24px',
    '3xl': '28px',
    '4xl': '36px',
    '5xl': '48px',
    '6xl': '64px',
  },
  styles: {
    global: {
      p: {
        fontSize: '1.3em',
        mb: '3',
      },
      blockquote: {
        color: 'red.300',
      },
      "#__next": {
        display: 'grid',
        w:"100vw",
        h:"100vh",
        gridTemplateAreas:{base: '"header header header" "nav toggle main"', xl: '"header header header" "nav toggle main"'},
        gridTemplateColumns:{base: "0px 0px 8fr", md: "auto auto 1fr", xl: "auto auto 1fr"},
        autoRows:"max-content",
      }
    },
  },
})

export default theme
