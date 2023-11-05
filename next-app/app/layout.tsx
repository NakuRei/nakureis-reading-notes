import type { Metadata } from 'next';
import { Noto_Sans_JP } from 'next/font/google';
import './globals.css';

import GlobalProviders from './_providers/GlobalProviders';

import Header from './_components/layouts/Header';
import Footer from './_components/layouts/Footer';

const notoSansJp = Noto_Sans_JP({
  display: 'swap',
  preload: false,
});

export const metadata: Metadata = {
  title: 'NakuReiの読書メモたち',
  description:
    '読んだ本についての思考や学びなどを書き留める個人的なスペースです。',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="jp" suppressHydrationWarning>
      <body
        className={`${notoSansJp.className} flex flex-col h-screen w-screen`}
      >
        <GlobalProviders>
          <Header
            appName={metadata.title?.toString() ?? 'NakuRei'}
            homePath="/"
            className="bg-base-300 text-base-content"
          />
          <main className="flex-1 overflow-x-hidden overflow-y-scroll">
            {children}
          </main>
          <Footer
            authorName="NakuRei"
            year={2023}
            className="bg-base-300 text-base-content"
          />
        </GlobalProviders>
      </body>
    </html>
  );
}
