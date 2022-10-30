import type { AppProps } from 'next/app';
//import '../../../dist/promo-button.esm.css'; // @tincre/promo-button/bundle.css
import '../styles/globals.css';

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default MyApp;
