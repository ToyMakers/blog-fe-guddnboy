import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import localFont from 'next/font/local';

const myFont = localFont({
  src: '../public/fonts/SegoeUI-Regular.ttf',
  display: 'swap',
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className={myFont.className}>
      <Component {...pageProps} />
    </div>
  );
}
