import type { Metadata } from 'next';
import { Noto_Sans_JP } from 'next/font/google';
import './globals.css';

import GlobalProviders from './_providers/GlobalProviders';

import MainFooter from './_components/layouts/MainFooter';

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
    <html lang="ja" suppressHydrationWarning className="max-lg:scroll-pt-20">
      <body
        className={`${notoSansJp.className} grid grid-rows-[1fr_auto] min-h-[100svh] w-full`}
      >
        <GlobalProviders>
          {children}
          <MainFooter year={2023} className="bg-neutral text-neutral-content" />
        </GlobalProviders>
      </body>
    </html>
  );
}
