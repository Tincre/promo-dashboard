import type { AppProps } from 'next/app';
//import '../../../dist/promo-button.esm.css'; // @tincre/promo-button/bundle.css
import { TourProvider } from '@reactour/tour';
import { promoDashboardTourSteps } from '@tincre/promo-dashboard';
import '../styles/globals.css';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <TourProvider steps={promoDashboardTourSteps}>
      <Component {...pageProps} />
    </TourProvider>
  );
}

export default MyApp;
