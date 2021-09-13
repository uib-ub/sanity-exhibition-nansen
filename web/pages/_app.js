// import Script from 'next/script'
import { ChakraProvider } from '@chakra-ui/react'
import theme from '../theme'
import '../styles/print.css'

function MyApp({ Component, pageProps }) {
  return (
    <>
      {/* Global Site Tag (gtag.js) - Google Analytics */}
      {/* <Script
        strategy="lazyOnload"
        src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}`}
      />
NEXT_PUBLIC_GOOGLE_ANALYTICS
      <Script strategy="lazyOnload">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}', {
            page_path: window.location.pathname,
          });
        `}
      </Script> */}

      <ChakraProvider theme={theme}>
        <Component {...pageProps} />
      </ChakraProvider>
    </>
  )
}

export default MyApp
